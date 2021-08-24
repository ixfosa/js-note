// 对象 — 原始值转换
    //- 当对象相加 obj1 + obj2，相减 obj1 - obj2，或者使用 alert(obj) 打印时会发生什么？
    //- 在这种情况下，对象会被自动转换为原始值，然后执行操作。


//- 所有的对象在布尔上下文（context）中均为 true。所以对于对象，不存在 to-boolean 转换，只有字符串和数值转换。

//- 数值转换发生在对象相减或应用数学函数时。例如，Date 对象可以相减，date1 - date2 的结果是两个日期之间的差值。

//- 至于字符串转换 —— 通常发生在我们像 alert(obj) 这样输出一个对象和类似的上下文中。



// -------------------------------------------------------------------------------------------



// ToPrimitive
    //- 可以使用特殊的对象方法，对字符串和数值转换进行微调。

// 下面是三个类型转换的变体，被称为 “hint”，在 规范 中有详细介绍
//（译注：当一个对象被用在需要原始值的上下文中时，例如，在 alert 或数学运算中，对象会被转换为原始值）：

// "string"
    //- 对象到字符串的转换，当我们对期望一个字符串的对象执行操作时，如 “alert”：

/*
// 输出
alert(obj);
// 将对象作为属性键
anotherObj[obj] = 123;
*/




// "number"
    //- 对象到数字的转换，例如当我们进行数学运算时：
/*
// 显式转换
let num = Number(obj);

// 数学运算（除了二进制加法）
let n = +obj; // 一元加法
let delta = date1 - date2;

// 小于/大于的比较
let greater = user1 > user2;
*/




// "default"
    //- 在少数情况下发生，当运算符“不确定”期望值的类型时。

    //- 例如，二进制加法 + 可用于字符串（连接），也可以用于数字（相加），所以字符串和数字这两种类型都可以。
    //- 因此，当二元加法得到对象类型的参数时，它将依据 "default" hint 来对其进行转换。

    //- 此外，如果对象被用于与字符串、数字或 symbol 进行 == 比较，这时到底应该进行哪种转换也不是很明确，
    //- 因此使用 "default" hint。

/*
// 二元加法使用默认 hint
let total = obj1 + obj2;

// obj == number 使用默认 hint
if (user == 1) { ... };
*/

// 像 < 和 > 这样的小于/大于比较运算符，也可以同时用于字符串和数字。
// 不过，它们使用 “number” hint，而不是 “default”。这是历史原因。

// 实际上，我们没有必要记住这些奇特的细节，除了一种情况（Date 对象）之外，
// 所有内建对象都以和 "number" 相同的方式实现 "default" 转换。我们也可以这样做。


// -------------------------------------------------------------------------------------------



// 没有 "boolean" hint
    //- 请注意 —— 只有三种 hint。就这么简单。

    //- 没有 “boolean” hint（在布尔上下文中所有对象都是 true）或其他任何东西。
    //- 如果我们将 "default" 和 "number" 视为相同，就像大多数内建函数一样，那么就只有两种转换了。


// 为了进行转换，JavaScript 尝试查找并调用三个对象方法：

    //- 调用 obj[Symbol.toPrimitive](hint) —— 带有 symbol 键 Symbol.toPrimitive（系统 symbol）的方法，
    //- 如果这个方法存在的话，

    //- 否则，如果 hint 是 "string" —— 尝试 obj.toString() 和 obj.valueOf()，无论哪个存在。

    //- 否则，如果 hint 是 "number" 或 "default" —— 尝试 obj.valueOf() 和 obj.toString()，无论哪个存在。




// -------------------------------------------------------------------------------------------



// Symbol.toPrimitive

//  Symbol.toPrimitive 的内建 symbol，它被用来给转换方法命名，像这样：

   //-  obj[Symbol.toPrimitive] = function(hint) {
   //-      // 返回一个原始值
   //-      // hint = "string"、"number" 和 "default" 中的一个
   //-  }


let user = {
    name: "ixfosa",
    age: 22,
    [Symbol.toPrimitive]: function(hint) {
        console.log(`hint: ${hint}`);

        return hint == "string" ? `name: ${this.name}` : `age: ${this.age}`
    }
};

console.info(user[Symbol.toPrimitive]());


// -------------------------------------------------------------------------------------------


// 08_对象—原始值转换.html


// -------------------------------------------------------------------------------------------



// 返回类型
    //- 关于所有原始转换方法，有一个重要的点需要知道，就是它们不一定会返回 “hint” 的原始值。

    // 没有限制 toString() 是否返回字符串，或 Symbol.toPrimitive 方法是否为 hint “number” 返回数字。

    // 唯一强制性的事情是：这些方法必须返回一个原始值，而不是对象。

// 历史原因
    //- 由于历史原因，如果 toString 或 valueOf 返回一个对象，则不会出现 error，
    //- 但是这种值会被忽略（就像这种方法根本不存在）。
    //- 这是因为在 JavaScript 语言发展初期，没有很好的 “error” 的概念。

    //- 相反，Symbol.toPrimitive 必须 返回一个原始值，否则就会出现 error。



// -------------------------------------------------------------------------------------------

// 总结
    //- 对象到原始值的转换，是由许多期望以原始值作为值的内建函数和运算符自动调用的。

    // 这里有三种类型（hint）：
        //- "string"（对于 alert 和其他需要字符串的操作）
        //- "number"（对于数学运算）
        //- "default"（少数运算符）

    // 规范明确描述了哪个运算符使用哪个 hint。很少有运算符“不知道期望什么”并使用 "default" hint。
    // 通常对于内建对象，"default" hint 的处理方式与 "number" 相同，因此在实践中，最后两个 hint 常常合并在一起。

    //- 转换算法是：
        //- 调用 obj[Symbol.toPrimitive](hint) 如果这个方法存在，
        //- 否则，如果 hint 是 "string"
        //- 尝试 obj.toString() 和 obj.valueOf()，无论哪个存在。
        //- 否则，如果 hint 是 "number" 或者 "default"
        //- 尝试 obj.valueOf() 和 obj.toString()，无论哪个存在。
        //- 在实践中，为了便于进行日志记录或调试，对于所有能够返回一种“可读性好”的对象的表达形式的转换，
        //= 只实现以 obj.toString() 作为全能转换的方法就够了。

