## nodejs 介绍

+ 基于 Chrome V8 引擎的 JavaScript 运行环境

  + 是 JavaScript 的运行环境，是在**服务端运行的环境**

+ Node.js 特点

  + **单线程**
  + **非阻塞 I/O**
  + **事件驱动编程**
  + **跨平台**

+ Node.js 架构

  Node.js 由 Libuv、Chrome V8、一些核心 API 构成

  <img src="E:\notes\js-note\_media\Node.js架构.png" alt="Node.js架构" style="zoom:50%;" />

  + Node Standard Library：Node.js 标准库，对外提供的 JavaScript 接口，例如模块 http、buffer、fs、stream 等
  + Node bindings： JavaScript 与 C++ 连接的桥梁，对下层模块进行封装，向上层提供基础的 API 接口。
  + V8：Google 开源的高性能 JavaScript 引擎，使用 C++ 开发，并且应用于谷歌浏览器。
  + Libuv：是一个跨平台的支持事件驱动的 I/O 库。它是使用 C 和 C++ 语言为 Node.js 所开发的，同时也是 I/O 操作的核心部分，例如读取文件和 OS 交互。 [Libuv 的中文教程](https://github.com/luohaha/Chinese-uvbook)
  + C-ares：C-ares 是一个异步 DNS 解析库
  + Low-Level Components：提供了 http 解析、OpenSSL、数据压缩（zlib）等功能。

+ Node.js 版本
  + CURRENT：指代最新的 Node.js 版本系列（单数）。
  + Active：指正在积极维护和升级的版本系列，包括向后移植非破坏性功能和改进，解决错误以及修补安全漏洞。
  + Maintenance：这是一个维护的 LTS 版本系列，直到它的生命周期终止，只会在短时间内收到错误修复和安全补丁。
  + `LTS`：是 Long-Term Support 的缩写，代表 Node.js 长期支持的版本（版本号为复数）。
  + EOL：EOL 是 End of Life 的首字母缩写，进入到 EOL 时间线的版本，将不在维护。







## 包管理器 NPM

+ NPM 是 Node.js 中的包管理器。管理 Node.js 各种模块 





## global 全局对象

JavaScript 中有一个特殊的对象，称为全局对象（Global Object），它及其所有属性都可以在程序的任何地方访问，即全局变量。

在浏览器 JavaScript 中，通常 window 是全局对象， 而 Node.js 中的全局对象是 global，所有全局变量（除了 global 本身以外）都是 global 对象的属性。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         

+ global （全局变量）

  node中有一个全局变量global，是node中最大的一个对象，相当于浏览器中的window对象，global中的成员在使用时，可以省略global

  + console          打印
  + process          和进程相关的对象
  + setInterval      是node中的，不是浏览器中的
  + require()         它是全局对象global中的一个方法，用于在js文件中引入另外的文件
  + __dirname     当前执行文件的绝对路径（在js文件中使用）
  + __filename     当前执行文件的绝对路径，包含文件名（在js文件中使用）
  + module

+ ECMAScript

+ 模块

  + fs
  + path
  + http
  + os ...



### 全局对象与全局变量



## console 



## 核心模块

### Module 模块机制









