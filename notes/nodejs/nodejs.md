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



+ 



## 包管理器 NPM

+ NPM 是 Node.js 中的包管理器。管理 Node.js 各种模块 
+ 

## Module 模块机制



