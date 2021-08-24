// 属性的 getter 和 setter

// 有两种类型的对象属性:
    //- 第一种是 数据属性。我们已经知道如何使用它们了。到目前为止，我们使用过的所有属性都是数据属性。

    //- 第二种类型的属性是新东西。它是 访问器属性（accessor properties）。
    //  它们本质上是用于获取和设置值的函数，但从外部代码来看就像常规属性。


// Getter 和 setter
    // 访问器属性由 “getter” 和 “setter” 方法表示。在对象字面量中，它们用 get 和 set 表示：
    //-     let obj = {
    //-         get propName() {
    //-             // 当读取 obj.propName 时，getter 起作用
    //-         },
    //-       
    //-         set propName(value) {
    //-             // 当执行 obj.propName = value 操作时，setter 起作用
    //-         }
    //-      };

    // 当读取 obj.propName 时，getter 起作用，当 obj.propName 被赋值时，setter 起作用。

"use strict";

// 例如，我们有一个具有 name 和 surname 属性的对象 user：
let user = {
    name: "Qing",
    surname: "Zi"
}

// 添加一个 fullName 属性，该属性值应该为 "Qing Zi"。
// 当然，我们不想复制粘贴已有的信息，因此我们可以使用访问器来实现：
let user2 = {
    name: "Qing",
    surname: "Zi",
    get fullName() {
        return `${this.name} ${ this.surname}`;
    }
};

console.log(user2.fullName); // Qing Zi


// 从外表看，访问器属性看起来就像一个普通属性。这就是访问器属性的设计思想。
// 我们不以函数的方式 调用 user.fullName，我们正常 读取 它：getter 在幕后运行。

// 截至目前，fullName 只有一个 getter。如果我们尝试赋值操作 user.fullName=，将会出现错误：
// user2.fullName = "Long"; // TypeError: Cannot set property fullName of #<Object> which has only a getter


// 让我们通过为 user.fullName 添加一个 setter 来修复它：
let user3 = {
    name: "Qing",
    surname: "Zi",

    get fullName() {
        return `${this.name} ${ this.surname}`;
    },

    set fullName(value) {
        // console.log(value.split(" "));
        [this.name, this.surname] = value.split(" ");
    }
};

// set fullName 将以给定值执行
user3.fullName = "Fosong Xia";
console.log(`name:${user3.name} - surname:${user3.surname}`); // name:Fosong - surname:Xia





// -------------------------------------------------------------------------------------------




// 访问器描述符
    // 访问器属性的描述符与数据属性的不同。
    // 对于访问器属性，没有 value 和 writable，但是有 get 和 set 函数。

    // 所以访问器描述符可能有：
        //- get —— 一个没有参数的函数，在读取属性时工作，
        //- set —— 带有一个参数的函数，当属性被设置时调用，
        //- enumerable —— 与数据属性的相同，
        //- configurable —— 与数据属性的相同。

// 例如，要使用 defineProperty 创建一个 fullName 访问器，我们可以使用 egt 和 set 来传递描述符：

let user4 = {
    name: "Qing",
    surname: "Zi",
};

Object.defineProperty(user4, "fullName", {
    set(value) {
        [this.name, this.surname] = value.split(" ");
    },

    get() {
        return `${this.name} ${ this.surname}`;
    },
})

console.log(user4.fullName); // Qing Zi

for (let key in user4) console.log(key); // name, surname



// 请注意，一个属性要么是访问器（具有 get/set 方法），要么是数据属性（具有 value），但不能两者都是。

// 如果我们试图在同一个描述符中同时提供 get 和 value，则会出现错误：
// Error: Invalid property descriptor.
    //-  Object.defineProperty({}, 'prop', {
    //-  get() {
    //-      return 1
    //-  }, 
    //-  value: 2
    //-  });




// -------------------------------------------------------------------------------------------





// 更聪明的 getter/setter
    //- Getter/setter 可以用作“真实”属性值的包装器，以便对它们进行更多的控制。

// 例如，如果我们想禁止太短的 user 的 name，我们可以创建一个 setter name，
// 并将值存储在一个单独的属性 _name 中：

let user5 = {
    get name() {
        return this._name;
    },

    set name(value) {
        if (value.length < 4) {
            console.log("Name is too short, need at least 4 characters");
            return;
        }
        this._name = value;
    }
};

user5.name = "Pete";
console.log(user5.name); // Pete

user5.name = ""; // Name is too short, need at least 4 characters

// 所以，name 被存储在 _name 属性中，并通过 getter 和 setter 进行访问。

// 从技术上讲，外部代码可以使用 user._name 直接访问 name。但是，
// 这儿有一个众所周知的约定，即以下划线 "_" 开头的属性是内部属性，不应该从对象外部进行访问。




// -------------------------------------------------------------------------------------------





// 兼容性
    //- 访问器的一大用途是，它们允许随时通过使用 getter 和 setter 替换“正常的”数据属性，
    //  来控制和调整这些属性的行为。

// 想象一下，我们开始使用数据属性 name 和 age 来实现 user 对象：
function User6(name, age) {
    this.name = name;
    this.age = age;
}

let qing = new User6("Zi Qing", 18);

console.log( qing.age ); // 18


// 但迟早，情况可能会发生变化。我们可能会决定存储 birthday，而不是 age，因为它更精确，更方便：
function User7(name, birthday) {
  this.name = name;
  this.birthday = birthday;
}

let fo = new User7("ixfosa", new Date(1998, 2, 19));

// 现在应该如何处理仍使用 age 属性的旧代码呢？
// 我们可以尝试找到所有这些地方并修改它们，但这会花费很多时间，而且如果其他很多人都在使用该代码，
// 那么可能很难完成所有修改。而且，user 中有 age 是一件好事，对吧？

// 那我们就把它保留下来吧。

// 为 age 添加一个 getter 来解决这个问题：
function User8(name, birthday) {
    this.name = name;
    this.birthday = birthday;

    // 年龄是根据当前日期和生日计算得出的
    Object.defineProperty(this, "age", {
        get() {
            let todayYear = new Date().getFullYear();
            return todayYear - this.birthday.getFullYear();
        }
    });
}

fo = new User8("ixfosa", new Date(1998, 2, 19));

console.log( fo.birthday ); // birthday 是可访问的
console.log( fo.age );      // age 也是可访问的
