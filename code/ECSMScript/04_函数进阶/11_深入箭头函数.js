// 深入理解箭头函数
    // 箭头函数不仅仅是编写简洁代码的“捷径”。它还具有非常特殊且有用的特性。

// JavaScript 充满了我们需要编写在其他地方执行的小函数的情况。

// 例如：
    //- arr.forEach(func) —— forEach 对每个数组元素都执行 func。
    //- setTimeout(func) —— func 由内建调度器执行。
    //- .....
    
// JavaScript 的精髓在于创建一个函数并将其传递到某个地方。

// 在这样的函数中，我们通常不想离开当前上下文。这就是箭头函数的主战场啦。



// 箭头函数没有 “this”
    // 箭头函数没有 this。如果访问 this，则会从外部获取。

// 例如，我们可以使用它在对象方法内部进行迭代：

let group = {
  title: "Our Group",
  students: ["John", "Pete", "Alice"],

  showList() {
    this.students.forEach(
      student => console.log(this.title + ': ' + student)
    );
  }
};

group.showList();
// Our Group: John
// Our Group: Pete
// Our Group: Alice

// 这里 forEach 中使用了箭头函数，所以其中的 this.title 其实和外部方法 showList 的完全一样。那就是：group.title。

// 如果我们使用正常的函数，则会出现错误：

let group2 = {
  title: "Our Group",
  students: ["John", "Pete", "Alice"],

  showList() {
    this.students.forEach(function(student) {
      // Error: Cannot read property 'title' of undefined
      console.log(this.title + ': ' + student)
    });
  }
};

group2.showList();
// undefined: John
// undefined: Pete
// undefined: Alice

// 报错是因为 forEach 运行它里面的这个函数，但是这个函数的 this 为默认值 this=undefined，
// 因此就出现了尝试访问 undefined.title 的情况。

// 但箭头函数就没事，因为它们没有 this。


// 不能对箭头函数进行 new 操作
    // 不具有 this 自然也就意味着另一个限制：箭头函数不能用作构造器（constructor）。不能用 new 调用它们。

// 箭头函数 VS bind
    // 箭头函数 => 和使用 .bind(this) 调用的常规函数之间有细微的差别：
    //- .bind(this) 创建了一个该函数的“绑定版本”。
    //- 箭头函数 => 没有创建任何绑定。箭头函数只是没有 this。this 的查找与常规变量的搜索方式完全相同：在外部词法环境中查找。





// -------------------------------------------------------------------------------------------





// 箭头函数没有 “arguments”
    //- 箭头函数也没有 arguments 变量。

// 当我们需要使用当前的 this 和 arguments 转发一个调用时，这对装饰器（decorators）来说非常有用。

// 例如，defer(f, ms) 获得了一个函数，并返回一个包装器，该包装器将调用延迟 ms 毫秒：
function defer(f, ms) {
  return function() {
    setTimeout(() => f.apply(this, arguments), ms)
  };
}

function sayHi(who) {
  console.log('Hello, ' + who);
}

let sayHiDeferred = defer(sayHi, 2000);
sayHiDeferred("John"); // 2 秒后显示：Hello, John

// 不用箭头函数的话，可以这么写：
// 在这里，我们必须创建额外的变量 args 和 ctx，以便 setTimeout 内部的函数可以获取它们。
function defer2(f, ms) {
  return function(...args) {
    let ctx = this;
    setTimeout(function() {
      return f.apply(ctx, args);
    }, ms);
  };
}

let sayHiDeferred2 = defer2(sayHi, 2000);
sayHiDeferred2("ixfosa"); // Hello, ixfosa





// -------------------------------------------------------------------------------------------



// 总结

// 箭头函数：
    //- 没有 this
    //- 没有 arguments
    //- 不能使用 new 进行调用
    //- 它们也没有 super，但目前我们还没有学到它。我们将在 类继承 一章中学习它。

// 这是因为，箭头函数是针对那些没有自己的“上下文”，但在当前上下文中起作用的短代码的。
// 并且箭头函数确实在这种使用场景中大放异彩。






