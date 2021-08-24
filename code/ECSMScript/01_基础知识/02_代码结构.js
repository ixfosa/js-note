
// 代码结构

/**
    语句
    语句是执行行为（action）的语法结构和命令。
    我们已经见过了 alert('Hello, world!') 这样可以用来显示消息的语句

    我们将 “Hello World” 这条信息一分为二：
    alert('Hello'); alert('World');

    通常，每条语句独占一行，以提高代码的可读性：
    alert('Hello');
    alert('World');

*/

/**
    分号
    当存在换行符（line break）时，在大多数情况下可以省略分号。

    下面的代码也是可以运行的：
    alert('Hello')
    alert('World')
    在这，JavaScript 将换行符理解成“隐式”的分号。这也被称为 自动分号插入。



    在大多数情况下，换行意味着一个分号。但是“大多数情况”并不意味着“总是”！
    有很多换行并不是分号的例子，例如：
    alert(3 +
    1
    + 2);
    代码输出 6，因为 JavaScript 并没有在这里插入分号。显而易见的是，如果一行以加号 "+" 结尾，
    那么这是一个“不完整的表达式”，不需要分号。所以，这个例子得到了预期的结果。但存在 JavaScript 
    无法确定是否真的需要自动插入分号的情况。
    

    [1, 2].forEach(alert) 错误的例子
 */



 /**
    注释
    随着时间推移，程序变得越来越复杂。为代码添加 注释 来描述它做了什么和为什么要这样做，变得非常有必要了。

    你可以在脚本的任何地方添加注释，它们并不会影响代码的执行，因为引擎会直接忽略它们。

    单行注释以两个正斜字符 // 开始。
杠
    这一行的剩余部分是注释。它可能独占一行或者跟随在一条语句的后面。

    就像这样：
    // 这行注释独占一行
    alert('Hello');
    alert('World'); // 这行注释跟随在语句后面


    不支持注释嵌套！
  */


 // 多行注释以一个正斜杠和星号开始 “/*” 并以一个星号和正斜杠结束 “*/”。

 //就像这样:
 /* 两个消息的例子。
 这是一个多行注释。
 */
 alert('Hello');
 alert('World');