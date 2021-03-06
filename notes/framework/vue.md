## 起步 Hello Vue

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    
    <div id="app">
        <h3>{{ msg }}</h3>
	</div>

	<!-- 1.引包 -->
	<script type="text/javascript" src="vue.js"></script>

	<script type="text/javascript">

        // 创建实例化vue对象
        new Vue({ 
            el: "#app",   
            data: function() {
                return {
                    msg: "Hello Vue"
                };
            }
        });
	</script>
</body>
</html>
```



## 插值表达式 

+ {{ 表达式 }}
  + 对象 (不要连续3个`{{{name:'ixfosa'}}}` , `{{ {name:'ixfosa'} }}`)
  + 字符串 {{ 'xxx' }}
  + 判断后的布尔值  {{  true }}
  + 三元表达式  {{ true?'是正确':'错误'  }}

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div id="app">
        <p>{{ obj.name }}</p>
        <p>{{ msg}}</p>
        <p>{{ bool}}</p>
        <p>{{ expr }}</p>
    </div>
    <script type="text/javascript" src="./vue.js"></script>

    <script>
        /*
            + 对象 (不要连续3个`{{{name:'ixfosa'}}}` , `{{ {name:'ixfosa'} }}`)
            + 字符串 {{ 'xxx' }}
            + 判断后的布尔值  {{  true }}
            + 三元表达式  {{ true?'是正确':'错误'  }}
        */
        new Vue({
            el: "#app",
            data() {
                return {
                    obj: {name: "ixfsoa"},
                    msg: "Hello Vue",
                    bool: 1 === 1,
                    expr: true ? false : true
                };
            }
        });        
    </script>
</body>
</html>
```



## Vue 指令

+ 在vue中 以`v-xxx`开头的就叫做指令，方便 `页面 + 数据` 的输出
  + 比如html页面中的属性 ```<div v-xxx ></div>``

+ 指令中封装了一些DOM行为, 结合属性作为一个暗号, 暗号有对应的值,根据不同的值，框架会进行相关DOM操作的绑定
+ vue 中常用的 v-指令
  + v-text:元素的InnerText属性,必须是双标签 跟{{ }}效果是一样的 使用较少
  + v-html: 元素的innerHTML
  + `v-if` : 判断是否插入这个元素,相当于对元素的销毁和创建
  + `v-else-if`
  + `v-else`
  + `v-show`   隐藏元素  如果确定要隐藏,   会给元素的style加上display:none。是基于css样式的切换
  + `v-for`
  + `v-bind`    单向数据绑定
  + `v-model`  双向数据绑定
  + `v-on`         事件绑定



### v-text 和 v-html

+ v-text :   不渲染 html  标记
  +  v-text 只能用在双标签中
     v-text 其实就是给元素的innerText赋值
+ v-html :  渲染 html  标记
  +  v-html 其实就是给元素的innerHTML赋值

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div id="app"></div>


    <script type="text/javascript" src="./vue.js"></script>
    <script>


        new Vue({
            el: "#app",
            template: `
                <div>
                    <div v-text = "text"></div>
                    <div v-html = "html"></div>
                </div>
            `,
            data() {
                
                return {
                    text: "<h3> text </h3>",
                    html: "<h3> html </h3>",
                }; 
            }
        });     
    </script>
</body>
</html>
```



### v-show 和 v-if 家族

+  v-show是显示与否的问题

+  v-if 如果值为false,会留下一个`<!---->`作为标记，万一未来v-if的值是true了，就在这里插入元素
+ 如果有 if 和 else 就不需要单独留坑了s
+ 如果全用上  v-if 相邻v-else-if 相邻 v-else 否则 v-else-if可以不用
+ v-if和v-else-if都有等于对应的值，而v-else直接写
+ v-if家族都是对元素进行插入和移除的操作



`v-if` 和 `v-show` 的区别

+ `v-if` 是“真正”的条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建。
+ `v-if` 也是**惰性的**：如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块。
+ `v-show` 就简单得多——不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 CSS 进行切换。
+ 一般来说，`v-if` 有更高的切换开销，而 `v-show` 有更高的初始渲染开销。
  + 如果需要非常频繁地切换，则使用 `v-show` 较好；
  + 如果在运行时条件很少改变，则使用 `v-if` 较好。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div id="app"></div>


    <script type="text/javascript" src="./vue.js"></script>
    <script>


        new Vue({
            el: "#app",
            template: `
                <div>
                    <div v-show = "isShow"> isShow </div>

                    <div v-if = "isShow"> v-if</div> 

                    <div v-if = "Math.random() > 0.5">
                        此值大于0.5
                    </div>
                    <div v-else>
                        此值大于0.5
                    </div >
                </div>
            `,
            data() {
                
                return {
                    isShow: true, 
                };
                   
            }
        });     
    </script>
</body>
</html>
```



### v-for

* 基本语法 `v-for="item in arr"`

* 对象的操作 `v-for="item in obj"`

* 如果是数组没有id

  * `v-for="(item,index) in arr" :class="index" `

* 各中v-for的属性顺序

  + 数组 item,index

  * 对象 value,key,index

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div id="app"></div>


    <script type="text/javascript" src="./vue.js"></script>
    <script>


        new Vue({
            el: "#app",
            template: `
                <div>

                    <dl v-for = "(item, index) in users">
                        <dt>{{ item.name }}</dt>
                        <dd>{{ item.gender }}</dd>
                    </dl>

                    <ul v-for = "(v, k) in obj">
                        <li>
                            {{ k }} -- {{ v }}
                        </li>
                    </ul>

                    <ul v-for = "(item, index) in arr">
                        <li>
                            <ul v-for = "(item, index) in item">
                                <li> {{ item }} </li>
                            </ul>
                        </li>
                    </ul>

                </div>
            `,
            data() {
                
                return {
                    users: [
                        {name: "ixfosa", gender: "男"},
                        {name: "long", gender: "女"},
                        {name: "zhong", gender: "女"},
                    ],

                    obj: {
                        name:'ixfosa',
						age:18,
						fav:'coding'
                    },

                    arr: [
                        [1, 2, 3],
                        [1, 2, 3],
                    ]
                };
                   
            }
        });     
    </script>
</body>
</html>
```



### v-bind

+ 给元素的属性赋值  `<div id="{{变量}}"></div>`
  - 可以给已经存在的属性赋值
  - 也可以给自定义属性赋值
+ 语法 在元素上 `v-bind:属性名="常量||变量名"`

+ 简写形式 `:属性名="变量名"`

```html
<div v-bind:原属性名="变量"></div>
<div :属性名="变量">
    
</div>
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .po{
			font-size: 30px;
		}
		.active{
			color: green;
		}
    </style>
</head>
<body>
    <div id="app"></div>
     
	<script type="text/javascript" src="vue.js"></script>
	<script type="text/javascript">

        // 创建实例化vue对象
        new Vue({
            el: "#app",
            template: `
                <div>
                    <!-- active 没有添加到 class -->
                    <p class ='po' v-bind:calss = "active">v-bind</p>
                    <!-- 简写 v-bind:calss = :calss -->
                    <p class ='po' :class = "{ active:isRed }">v-bind</p>    
                </div>
            `,
            data: function() {
                return {
                    isRed: true
                };
            }
        });
	</script>
</body>
</html>
```



### v-model

双向数据流（绑定）

* 页面改变影响内存(js)
* 内存(js)改变影响页面

> 对有 `value` 属性的标记有效

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div id="app"></div>
       
	<!-- 1.引包 -->
	<script type="text/javascript" src="vue.js"></script>

	<script type="text/javascript">

        // 创建实例化vue对象
        new Vue({
            el: "#app",
            template: `
                <div>
                   <input type="text" v-model:value="msg"/>
                   <input type="text" v-model="msg"/>
                   <p>{{ msg }}</p>
                </div>
            `,
            data: function() {
                return {
                    msg: "Hello Vue"
                };
            }
        });
	</script>
</body>
</html>
```



### v-on

* 处理自定义原生事件
* 普通使用   ```v-on:事件名="表达式||函数名"```
* 简写方式  ``` @事件名="表达式"```

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
		.po{
			color: red;
		}
		.active{
			color: green;
		}
	</style>
</head>
<body>
    <div id="app"></div>

	<script type="text/javascript" src="vue.js"></script>

	<script type="text/javascript">

        // 创建实例化vue对象
        new Vue({
            el: "#app",
            template: `
                <div>
                    <p class ='po' :class = "{ active: isRed }">v-bind</p>

                    <button v-on:click="change">切换字体的颜色</button>

                   <!--  <button @click="{isRed = !isRed}">切换字体的颜色</button> -->
                </div>
            `,
            data: function() {
                return {
                    isRed: true
                };
            },
            methods: {
                change() {
                    this.isRed = !this.isRed;
                }
            }
        });
	</script>
</body>
</html>
```



### v-bind 和 v-model 的区别

* `input v-model="name"`
  - 双向数据绑定  页面对于input的value改变，能影响内存中name变量
  - 内存js改变name的值，会影响页面重新渲染最新值
* `input :value="name"`
  - 单向数据绑定 内存改变影响页面改变
* v-model: 其的改变影响其他  v-bind: 其的改变不影响其他
* v-bind就是对属性的简单赋值,当内存中值改变，还是会触发重新渲染

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div id="app"></div>
       
	<!-- 1.引包 -->
	<script type="text/javascript" src="vue.js"></script>

	<script type="text/javascript">

        // 创建实例化vue对象
        new Vue({
            el: "#app",
            template: `
                <div>
                   <input type="text" v-bind:value="msg" v-on:input="change" />
                   <p>{{ msg }}</p>
                </div>
            `,
            data: function() {
                return {
                    msg: "Hello Vue"
                };
            },
            methods: {
                change(e) {
                    console.log(e.target.value);
                    this.msg = e.target.value;
                }
            }
        });
	</script>
</body>
</html>
```





## Vue 组件	

### 局部组件

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        * {
            margin: 0px;
            padding: 0px;
        }
        .head {
            width: 100%;
            height: 60px;
            background-color: yellowgreen;
        }

        .main-content {
            width: 100%;
            height: 500px;
            display: flex;
        }

        .aside {
            width: 25%;
            height: 100%;
            background-color: green;
        }

        .content {
            width: 100%;
            height: 100%;
            background-color: pink;
        }
    </style>
</head>
<body>
    <div id="app"></div>

	<script type="text/javascript" src="vue.js"></script>
	<script type="text/javascript">


        // 子组件
        let Vheader = {
            template: `
                <div class="head">
                    header
                </div>
            `,
        };
        let Vaside = {
            template: `
                <div class="aside">
                    aside
                </div>
            `,
        };
        let Vcontent = {
            template: `
                <div class="content">
                    content
                </div>
            `,
        };

        // 1.声明局部组件
        let App = {
            template: `
                <div class="main">
                    <Vheader></Vheader>
                    <div class="main-content">
                        <Vaside></Vaside>
                        <Vcontent></Vcontent>
                    </div>
                </div>
            `,
            components: {
                Vheader,
                Vaside,
                Vcontent
            }
        }
        
        // 创建实例化vue对象
        new Vue({
            el: "#app",
            // 2.挂载组件
            components: {
                App
            },
            template: `<App></App>`
        });
	</script>
</body>
</html>
```



### 全局组件

* 应用场景: 多出使用的公共性功能组件，就可以注册成全局组件,减少冗余代码
* 全局API `Vue.component('组件名',组件对象);`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        * {
            margin: 0px;
            padding: 0px;
        }
        .head {
            width: 100%;
            height: 60px;
            background-color: yellowgreen;
        }

        .main-content {
            width: 100%;
            height: 500px;
            display: flex;
        }

        .aside {
            width: 25%;
            height: 100%;
            background-color: green;
        }

        .content {
            width: 100%;
            height: 100%;
            background-color: pink;
        }
    </style>
</head>
<body>
    <div id="app"></div>

	<script type="text/javascript" src="vue.js"></script>
	<script type="text/javascript">

        // 全局组件
        Vue.component("btnComm", {
            template: `
                <button @click="show">全局组件</button>
            `,
            methods: {
                show() {
                    alert("hello vue");
                }
            },
            
        });

        // 子组件
        let Vheader = {
            template: `
                <div class="head">
                    header
                    <btnComm></btnComm>
                </div>
            `,
        };
        let Vaside = {
            template: `
                <div class="aside">
                    aside
                    <btnComm></btnComm>
                </div>
            `,
        };
        let Vcontent = {
            template: `
                <div class="content">
                    content
                    <btnComm></btnComm>
                </div>
            `,
        };

        // 1.声明局部组件
        let App = {
            template: `
                <div class="main">
                    <Vheader></Vheader>
                    <div class="main-content">
                        <Vaside></Vaside>
                        <Vcontent></Vcontent>
                    </div>
                </div>
            `,
            components: {
                Vheader,
                Vaside,
                Vcontent
            }
        }
        
        // 创建实例化vue对象
        new Vue({
            el: "#app",
             // 2.挂载组件
             components: {
                App
            },
            template: `<App></App>`
        });
	</script>
</body>
</html>
```

### 全局组件的使用

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        * {
            margin: 0px;
            padding: 0px;
        }
        .head {
            width: 100%;
            height: 60px;
            background-color: yellowgreen;
        }

        .main-content {
            width: 100%;
            height: 500px;
            display: flex;
        }

        .aside {
            width: 25%;
            height: 100%;
            background-color: green;
        }

        .content {
            width: 100%;
            height: 100%;
            background-color: pink;
        }

        .default {
            display: inline-block;
            line-height: 1;
            white-space: nowrap;
            cursor: pointer;
            background: #fff;
            border: 1px solid #dcdfe6;
            border-color: #dcdfe6;
            color: #606266;
            text-align: center;
            box-sizing: border-box;
            outline: none;
            margin: 0;
            transition: .1s;
            font-weight: 500;
            padding: 12px 20px;
            font-size: 14px;
            border-radius: 4px;
        }

        .success {
            color: #fff;
            background-color: #67c23a;
            border-color: #67c23a;
        }
    </style>
</head>
<body>
    <div id="app"></div>

	<script type="text/javascript" src="vue.js"></script>
	<script type="text/javascript">

        // 全局组件
        // slot 元素作为承载分发内容的出口
        Vue.component("Vbtn", {
            template: `
                <button class="default" :class="type">
                    <slot></slot>
                </button>
            `,
            props: ["type"]
        });

        // 子组件
        let Vheader = {
            template: `
                <div class="head">
                    header
                    <Vbtn @click.native="def">默认</Vbtn>
                </div>
            `,
            methods: {
                def(e) {
                    console.log(e.target.innerText);
                }
            },
        };
        let Vaside = {
            template: `
                <div class="aside">
                    aside
                    <Vbtn type="success">刷新</Vbtn>
                </div>
            `,
        };
        let Vcontent = {
            template: `
                <div class="content">
                    content
                    <Vbtn type="default" @click.native="add">添加</Vbtn>
                </div>
            `,
            methods: {
                add(e) {
                    console.log(e.target.innerText);
                }
            },
        };

        // 1.声明局部组件
        let App = {
            template: `
                <div class="main">
                    <Vheader></Vheader>
                    <div class="main-content">
                        <Vaside></Vaside>
                        <Vcontent></Vcontent>
                    </div>
                </div>
            `,
            components: {
                Vheader,
                Vaside,
                Vcontent
            }
        }
        // 创建实例化vue对象
        new Vue({
            el: "#app",
             // 2.挂载组件
             components: {
                App
            },
            template: `<App></App>`
        });
	</script>
</body>
</html>
```





### 父子组件传值-父传子

1. 父用子的时候通过属性Prop传递
2. 子要声明props:['属性名'] 来接收
3. 收到就是自己的了，随便你用
   + 在template中 直接用
   + 在js中 this.属性名 用



> 总结:父传,子声明,就是子的了
>
> 补充: 常量传递直接用，变量传递加冒号

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        * {
            margin: 0px;
            padding: 0px;
        }
        .box {
            width: 300px;
            height: 300px;
            background-color: yellowgreen;
        }
    </style>
</head>
<body>
    <div id="app"></div>

	<script type="text/javascript" src="vue.js"></script>
	<script type="text/javascript">



        // 子组件
        let Vbox = {
            template: `
                <div class="box">
                    <ul>
                        <li v-for = "(item, idx) in users">
                            {{ item.name }}    
                        </li>   
                    </ul>
                </div>
            `,
            props: ["users"]
        };


        // 1.声明局部组件
        let App = {
            template: `
                <div class="main">
                    <Vbox :users="users"></Vbox>
                </div>
            `,
            components: {
                Vbox
            },
            data: function() {
                return {
                    users: [
                        {id: 1, name: "ixfosa"},
                        {id: 2, name: "long"},
                        {id: 3, name: "zhong"}
                    ]
                };
            }
        }

        // 创建实例化vue对象
        new Vue({
            el: "#app",
             // 2.挂载组件
             components: {
                App
            },
            template: `<App></App>`
        });
	</script>
</body>
</html>
```



### 通过事件向父组件发送消息

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        * {
            margin: 0px;
            padding: 0px;
        }
        .box {
            width: 300px;
            height: 300px;
            background-color: yellowgreen;
        }
    
    </style>
</head>
<body>
    <div id="app"></div>

	<script type="text/javascript" src="vue.js"></script>
	<script type="text/javascript">

         
        // 子组件
        let Vbox = {
            template: ` 
                <div class="box">
                    <ul>
                        <li v-for = "(item, idx) in users">
                            {{ item.name }}    
                        </li>   
                    </ul>
                </div>
            `,
            props: ["users"]
        
        };

        let Vbtn = {
            template: `<button  @click = 'changeFontSize'>字体变大</button>`,
            methods: {
                changeFontSize() {
                    // 触发父组件 中声明的自定义事件   vue $emit()
					// 第一个参数是触发自定义事件的名字 第二个参数就是传进去的值
                    this.$emit("change");
                }
            }
        };

        // 1.声明局部组件
        let App = {
            template: `
                <div class="main" :style='{fontSize:postFontSize+"em"}'>
                    <Vbtn @change="changeFontSize" />
                    <Vbox :users="users"></Vbox>
                </div>
            `,
            components: {
                Vbtn,
                Vbox
            },
            data: function() {
                return {
                    users: [
                        {id: 1, name: "ixfosa"},
                        {id: 2, name: "long"},
                        {id: 3, name: "zhong"}
                    ],
                    postFontSize: 1
                };
            },
            methods: {
                changeFontSize() {
                    this.postFontSize += .1;
                }
            }
        }

        // 创建实例化vue对象
        new Vue({
            el: "#app",
             // 2.挂载组件
             components: {
                App
            },
            template: `<App></App>`
        });
	</script>
</body>
</html>
```



### 具名插槽 slot

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    
    <div id="app"></div>


    <script type="text/javascript" src="./vue.js"></script>
    <script>

        Vue.component("mySlot", {
            template: `
                <div>
                    预留的第一个坑
                    <slot name = "two"></slot>
                    预留的第二个坑
                    <slot name = "one"></slot>
                </div>
            `,
        })
        new Vue({
            el: "#app",
            template: `
            <div>
                <mySlot>
                    <p slot="one">我是第一个坑</p>
                    <p slot="two">我是第二个坑</p>
                </mySlot>
            </div>
            `
        }); 
    </script>
</body>
</html>
```

```html
预留的第一个坑
我是第二个坑

预留的第二个坑
我是第一个坑
```



## 过滤器

### 全局过滤器 filter

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>

    <div id="app">
        {{ msg | myReverse }}
    </div>

	<script type="text/javascript" src="vue.js"></script>
	<script type="text/javascript">

        // 全局过滤器
        Vue.filter("myReverse", function(value) {
            return value.split("").reverse().join("");
        })

        // 创建实例化vue对象
        new Vue({
            el: "#app",
            
            data() {
                return {
                    msg: "euV olleH"
                };
            }
        });
	</script>
</body>
</html>
```

### 组件内部过滤器 filters

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>

    <div id="app"></div>
    
	<script type="text/javascript" src="vue.js"></script>
	<script type="text/javascript">
    
        // 全局过滤器

		Vue.filter('myReverse',function(value, arg) {
			
			return arg + ' ' + value.split('').reverse().join('');
		});

        /*
        在组件内部用 filters:{
			过滤器的名字:function(value){

				// 内部一定要return 
	
			}

			调用过滤器 ：  数据属性 | 过滤器的名字
		}
		*/

        let App = {
            template: `
                <div>
                    <input type="number" v-model="price" />
                    <p>{{ price | myCurrentcy }}</p>    
                    <p>{{ msg | myReverse("haha") }}</p>
                </div>
            `,
            filters: {
                myCurrentcy(value) {
                    return "¥" + value;
                }
            },
            data() {
                return {
                    price: 0
                };
            },
            props: ["msg"]
        }

        // 创建实例化vue对象
        new Vue({
            el: "#app",
            data() {
                return {
                    msg: "euV olleH"
                };
            },
            components: {
                App
            },
            template: `<App :msg="msg"></App>`
        });
	</script>
</body>
</html>
```



## 监视改动  watch 

* watch 监视单个
* computed 监视多个

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div id="app">
        <input type="text" v-model = "msg" />
        <p>{{ msg }}</p>
        <button @click="user.name='long'">改变</button>
        <p>{{ user.name }}</p>
    </div>

    <script type="text/javascript" src="vue.js"></script>
	<script type="text/javascript">
        new Vue({
            el: "#app",
            data: function () {
                return {
                    msg: "",
                    user: {name: "ixfosa"}
                };
            },
            watch: {
                msg: function(newV, oldV) {
                    console.log(newV, oldV)
                    if (oldV == "long") {
                        alert("Hello Long");
                    }
                },

                // 监听复杂数据类型  object, array 深度监视  
                user: {
                    deep: true,
                    handler: function(newV, oldV) {
                        alert(oldV.name);
                    }
                }
            }
        });
    
    </script>
</body>
</html>
```



## 属性计算 computed 

### computed - getter

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style type="text/css">
		*{
			padding: 0;
			margin: 0;
		}
		ul{
			list-style: none;
		}
		ul li{
			margin: 20px 20px;
			padding: 10px 5px;
			border-radius: 3px;
		}
		ul li.active{
			background-color: #66FFFF;
		}

	</style>
</head>
<body>
    <div id="app">
        <audio :src="getCurrentSongSrc" autoplay  controls></audio>
        <ul>
            <li v-for="(item, index) in musicData" :class="{active:currentIndex == index}" @click="clickHandler(index)">
                <h3> 歌名：{{ item.name }}</h3>
                <p>歌手: {{ item.author }}</p>
            </li>
        </ul>
    </div>
    <script type="text/javascript" src="vue.js"></script>
	<script type="text/javascript">

        let musicData = [
                {id:1,name:'于荣光 - 少林英雄',author:'于荣光',songSrc:'./static/于荣光 - 少林英雄.mp3'},
                {id:2,name:'Joel Adams - Please Dont Go',author:'Joel Adams',songSrc:'./static/Joel Adams - Please Dont Go.mp3'},
                {id:3,name:'MKJ - Time',author:'MKJ',songSrc:'./static/MKJ - Time.mp3'},
                {id:4,name:'Russ - Psycho (Pt. 2)',author:'Russ',songSrc:'./static/Russ - Psycho (Pt. 2).mp3'}
            ]
        new Vue({
            el: "#app",
            data() {
                return {
                    musicData: musicData,
                    currentIndex: 0
                };
            },
            computed: {
                getCurrentSongSrc: function() {
                    // 默认只有getter
                    return this.musicData[this.currentIndex].songSrc;
                }
            },
            methods: {
                clickHandler: function(index) {
                    this.currentIndex = index;
                }
            },
        });
    </script>

</body>
</html>
```



### computed - setter

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style type="text/css">
		*{
			padding: 0;
			margin: 0;
		}
		ul{
			list-style: none;
		}
		ul li{
			margin: 20px 20px;
			padding: 10px 5px;
			border-radius: 3px;
		}
		ul li.active{
			background-color: #66FFFF;
		}

	</style>
</head>
<body>
    <div id="app">
        <audio :src="getCurrentSongSrc" autoplay  controls></audio>
        <ul>
            <li v-for="(item, index) in musicData" :class="{active:currentIndex == index}" @click="clickHandler(index)">
                <h3> 歌名：{{ item.name }}</h3>
                <p>歌手: {{ item.author }}</p>
            </li>
        </ul>
    </div>
    <script type="text/javascript" src="vue.js"></script>
	<script type="text/javascript">

        let musicData = [
                {id:1,name:'于荣光 - 少林英雄',author:'于荣光',songSrc:'./static/于荣光 - 少林英雄.mp3'},
                {id:2,name:'Joel Adams - Please Dont Go',author:'Joel Adams',songSrc:'./static/Joel Adams - Please Dont Go.mp3'},
                {id:3,name:'MKJ - Time',author:'MKJ',songSrc:'./static/MKJ - Time.mp3'},
                {id:4,name:'Russ - Psycho (Pt. 2)',author:'Russ',songSrc:'./static/Russ - Psycho (Pt. 2).mp3'}
            ]
        new Vue({
            el: "#app",
            data() {
                return {
                    musicData: musicData,
                    currentIndex: 0
                };
            },
            computed: {
                getCurrentSongSrc: {
					set:function(newV) {
						console.log(newV); //索引
						this.currentIndex = newV;
					},
					get:function() {
						return this.musicData[this.currentIndex].songSrc;
					}
				}
            },
            methods: {
                clickHandler: function(index) {
                    // this.currentIndex = index;
                    console.log(this.getCurrentSongSrc);
                    this.getCurrentSongSrc = index;
                }
            },
         
        });
    </script>
</body>
</html>
```



## 组件生命周期

* 需要频繁的创建和销毁组件
  - 比如页面中部分内容显示与隐藏，但是用的是v-if
* 组件缓存
  - 内置组件中`<keep-alive>`
  - 被其包裹的组件，在v-if=false的时候，不会销毁，而是停用
  - v-if="true" 不会创建,而是激活
  - 避免频繁创建组件对象的性能损耗
* **生命周期钩子**比较
  - `created` 和 `beforeCreate`
    + A 可以操作数据 B 数据没有初始化
  - `mounted` 和 `beforeMount`
    + A 可以操作DOM B 还未生成DOM
  - `updated` 和 `beforeUpdate`
    + A 可以获取最终数据 B 可以二次修改
  - 频繁销毁创建的组件使用内置组件`<keep-alive></keep-alive>`包裹

```js
// 生命周期的钩子函数   函数
    beforeCreate
    created
    beforeMount
    mounted
    beforeUpdate
    updated
    activated
    deactivated
    beforeDestroy
    destroyed
    
    
    
    activated(){  //激活的 keep-alive v-if="true"
        console.log('activated')
	},
	deactivated(){  //停用的 keep-alive v-if="false"
		console.log('deactivated')
	},
	beforeDestroy(){ //销毁前 v-if="false"
		console.log('beforeDestroy')
	},
	destroyed(){//销毁后 v-if="false"
		console.log('destroyed')
	},
```

<img src="../../_media/lifecycle.png" alt="lifecycle" style="zoom:80%;" />

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div id="app"></div>

	<script type="text/javascript" src="vue.js"></script>
	<script type="text/javascript">
        let Test = {
            template: `
                <div>
                    <p>{{ msg }}</P>
                    <button @click="changeHandler">改变</button>
                </div>
            `,
            data() {
                return {
                    msg: "Hello Vue"
                };
            },
            methods: {
                changeHandler() {
                    this.msg += "Hello JS | ";
                }
            },
            beforeCreate() {
                // 组件创建之前
				console.log(this.msg);
            },
            created() {
                // 组件创建之后
				// 使用该组件，就会调用created方法 在created这个方法中可以操作后端的数据，数据响应视图
				// 应用： 发起ajax请求
				console.log(this.msg);
				this.msg = 'change';
            },
            beforeMount() {
                // 挂载数据到DOM之前会调用
				console.log(document.getElementById('app'));
            },
            mounted() {
                // 挂载数据到DOM之后会调用  Vue 作用以后的DOM
				console.log(document.getElementById('app'));
            },
            beforeUpdate() {
                // 在更新DOM之前 调用此钩子函数 应用：可以获取原始的DOM
				console.log(document.getElementById('app').innerHTML);
            },
            updated() {
                // 在更新DOM之后 调用此钩子函数 应用：可以获取最新的DOM
				console.log(document.getElementById('app').innerHTML);
            },
            beforeDestroy() {
                console.log('beforeDestroy');
            },
            destroyed() {
                console.log('destroyed');
            },
            activated() {
                console.log('组件被激活了');
            },
            deactivated() {
                console.log('组件被停用了');
            },
        }
        let App = {
            // Vue的内置组件，能在组件的切换过程中将状态保留在内存中父，防止重复渲染DOM
            template: `
                <div class='app'>
                    <!-- <keep-alive>
                        <Test v-if = 'isShow'></Test>
                    </keep-alive> -->
                    <Test v-if = 'isShow'></Test>
                    <button @click="isWhow = !isShow">isActive</button>
                </div>
            `,
            data() {
                return {
                    isShow: true
                };
            },
            components: {
                Test
            }
        };

        new Vue({
            el: "#app",
            template: "<App />",
            components: {
                App
            }
        });
	</script>
</body>
</html>
```



## 获取DOM元素及添加事件

### 获取DOM元素

+ 绑定： `<tag ref="name"></tag>`
  + `ref` 属性值 不能重名	
+ 获取：`this.$refs.name`



```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div id="app"></div>

    <script type="text/javascript" src="vue.js"></script>
	<script type="text/javascript">

        let SubComponent = {
            template: `
                <div></div>
            `
        };

        Vue.component("SubCom", SubComponent);

        let App = {
            template: `
                <div>
                    <button ref="btn1">btn1</button>
                    <button ref="btn2">btn2</button>    
                    <button ref="btn2">btn2</button>
                    
                    <SubCom> ref="sub""></SubCom>
                </div>
            `,
            created() {
                // created: undefined
                console.log( "created: " + this.$refs.btn1);
            },
            beforeMount() {
                beforeMount: undefined
                console.log("beforeMount: " + this.$refs.btn1);
            },
            mounted() {

                // 如果是给标签绑定ref属性，使用this.$refs.xxx 获取的是原生js的DOM对象
				// ref 属性值 不能重名
				// 如果是给组件绑定的ref属性 那么this.$refs.xxx获取的是组件对象
                // mounted: [object HTMLButtonElement]
                // mounted: [object HTMLButtonElement]
                // mounted: undefined
                console.log("mounted: " + this.$refs.btn1);
                console.log("mounted: " + this.$refs.btn2);
                console.log("mounted: " + this.$refs.sub);
            },
        };

        new Vue({
            el: "#app",
            template: `<App />`,
            components: {
                App
            }
        });
    </script>
</body>
</html>
```



### 添加事件

+ `this.$nextTick(fn)`

  在DOM更新循环结束之后执行延迟回调，在修改数据之后使用 $nextTick 可以在回调中获取到更新后的DOM

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div id="app"></div>

    <script type="text/javascript" src="vue.js"></script>
	<script type="text/javascript">

        let App = {
            template: `
                <div>
                    <input type="text"  v-show = 'isShow' ref = 'input'/>
                </div>
            `,
            data() {
                return {
                    isShow: false
                };
            },
            mounted() {

                this.isShow = true;
                // 挂在之后获取焦点
                // this.$refs.input.focus(); // 无法获取
                
                // $nextTick 是在DOM更新循环结束之后执行延迟回调，
                // 在修改数据之后使用 $nextTick 可以在回调中获取到更新后的DOM
                this.$nextTick(() => {
                        // 更新之后的DOM
                        this.$refs.input.focus(); // 获取成功
                }); 
            },
        };

        new Vue({
            el: "#app",
            template: `<App />`,
            components: {
                App
            }
        });
    </script>
</body>
</html>
```



## Vue Router

### 前端路由原理

```js
www.ixfosa.top/#/hello
	http://www.ixfosa.top  为真实的路径
	#/hello                则为网页中的位置，称为锚点


location.hash
	获取： #/hello


监听 location.hash
window.onhashchange = function() {

}

前端路由原理：
	通过事件 onhashchange 获取 location.hash 的锚点值，通过对 锚点值 值的判断调用不同模块
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <a href="#/login">login</a>
    <a href="#/register">register</a>
    <div id="app">

    </div>
    <script>
        let oDiv = document.getElementById("app");
        window.onhashchange = function() {
            console.log(location.hash);

            switch (location.hash) {
                case "#/login":
                    oDiv.innerHTML = "login page";
                    break;
                case "#/register":
                    oDiv.innerHTML = "register page";
                    break;
                default: 
                    oDiv.innerHTML = "default page";
            }
        }
    </script>
</body>
</html>
```



### vue-router的使用

* vue-router ：其是vue的核心插件

* 下载 `npm i vue-router -S`
* vue-router中的对象
  * `$route` 路由信息对象,只读对象
  * `$router` 路由操作对象,只写对象

+ 参数router-link,
  + `Vue.prototype.xxx = {add: fn}`   所有组件中，使用this.xxx就能拿到这个对象
  + 查询字符串 
    * 1: 配置`:to="{name:'detail',query:{id:hero.id} }"`
    * 2: 规则 `{name:'detail',path:'/detail',component:Detail}`
    * 3: 获取 `this.$route.query.id`
    * 4: 生成 `<a href="/detail?id=1">`
  + path方式 
    * 1: 配置 `:to="{name:'detail',params:{id:hero.id}  }"`
    * 2: 规则 `{ name:'detail',path:'/detail/:id'}`
    * 3: 获取 `this.$route.params.id`
    * 4: 生成 `<a href="/detail/1">`

+ vue-router的使用

  * `<router-link to="/path" > ` 默认会被渲染成a标签，`to ` 默认会被渲染成href属性
  *  `<router-view>` 路由组件的出口

  ```js
  Vue.use(插件对象);   //  过程中会注册一些全局组件,及给vm或者组件对象挂在属性
  
  // 给vm及组件对象挂在的方式  :  
  Object.defineProperty(Vue.prototype,'$router', {
  get:function () {
      return 自己的router对象;
  
      }
  })
  ```

  

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div id="app"></div>
       
	<!-- 引包 -->
	<script type="text/javascript" src="vue.js"></script>
    <!-- 引包 引入 核心的插件vue-router -->
	<script type="text/javascript" src="vue-router.js"></script>
	<script type="text/javascript">

        // 1.让vue使用该VueRouter创建
        Vue.use(VueRouter);

        // 2.声明组件
        let Login = {
            template: `<h3>login</h3>`
        }
        let Register = {
            template: `<h3>register</h3>`
        }
       
        // 3.创建路由对象
        let router = new VueRouter({
            // 3.1对象
            routes: [
                // 3.2配置规则
                {
                    path: "/login",
                    component: Login
                },
                {
                    path: "/register",
                    component: Register
                }
            ]
        });

        // 抛出两个全局的组件 router-link  router-view
        let App = {
            template: `
                <div>
                    <!-- router-link默认会被渲染成a标签，to默认会被渲染成href属性 -->
                    <router-link to="/login">login</router-link>
                    <router-link to="/register">register</router-link>

                    <!-- 路由组件的出口 -->
                    <router-view></router-view>
                </div>
            `,
            
        }

        // 将配置好的路由对象关联到vue实例化对象中
        new Vue({
            el: "#app",
            router: router,
            template: `<App />`,
            components: {
                App
            }
        });
	</script>
</body>
</html>
```



### 命名路由

+ `<router-link :to="{name:'name'}">`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div id="app"></div>
       
	<!-- 引包 -->
	<script type="text/javascript" src="vue.js"></script>
    <!-- 引包 引入 核心的插件vue-router -->
	<script type="text/javascript" src="vue-router.js"></script>
	<script type="text/javascript">

        // 让vue使用该VueRouter创建 如果vue是一个局部作用域的对象 那么必须Vue.use(VueRouter);
        // Vue.use(VueRouter);

        // 声明组件
        let Login = {
            template: `<h3>login</h3>`
        };
        let Register = {
            template: `<h3>register</h3>`
        };
       
        // 创建路由对象
        let router = new VueRouter({
            // 配置路由对象
            routes: [
                // 路由匹配的规则
                {
                    path: "/login",
                    name: "login",
                    component: Login
                },
                {
                    path: "/register",
                    name: "register",
                    component: Register
                }
            ]
        });

        // 抛出两个全局的组件 router-link  router-view
        let App = {
            template: `
                <div>
                    <!-- router-link默认会被渲染成a标签，to默认会被渲染成href属性 -->
                    <router-link :to="{name:'login'}">login</router-link>
                    <router-link :to="{name:'register'}">register</router-link>

                    <!-- 路由组件的出口 -->
                    <router-view></router-view>
                </div>
            `,
        };

        // 将配置好的路由对象关联到vue实例化对象中
        new Vue({
            el: "#app",
            router: router,
            template: `<App />`,
            components: {
                App
            }
        });
	</script>
</body>
</html>
```



### 路由参数

地址栏 路由范式

+ vue.html#/user/1          params 动态路由参数

  + `routes:[{ path: "/user/:id" }]`
  + `<router-link :to="{name:'name', params:{id:1}}">`

+ vue.html#/user?id = 1  query

  + `<router-link :to="{name:'name', query:{id:1}}">`

+ 参数接收

  ` created() { console.log(this.$route.params); }`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div id="app"></div>
       
	<!-- 引包 -->
	<script type="text/javascript" src="vue.js"></script>
    <!-- 引包 引入 核心的插件vue-router -->
	<script type="text/javascript" src="vue-router.js"></script>
	<script type="text/javascript">

        // 地址栏 路由范式
            // 1. xxxxx.html#/user/1    params 动态路由参数
            // 2. ooooo.html#/user?id = 1  query

        // 让vue使用该VueRouter创建 如果vue是一个局部作用域的对象 那么必须Vue.use(VueRouter);
        // Vue.use(VueRouter);

        // 声明组件
        let UserParams = {
            template: `<h3>UserParams</h3>`,
            created() {
                // {id: 1}
                console.log(this.$route.params);
                // undefined
                console.log(this.$routes);
            },

        };
        
        let UserQuery = {
            template: `<h3>register</h3>`,
            created() {
                // {id: 1}
                console.log(this.$route.query);
                // undefined
                console.log(this.$routes);
            },
        };
       

        // 创建路由对象
        let router = new VueRouter({
            // 配置路由对象
            routes: [
                // 路由匹配的规则
                {   
                    // 动态路由参数 以冒号开头
                    // #/user/1
                    path: "/user/:id",
                    name: "userP",
                    component: UserParams
                },
                {   
                    // #/user?id=1
                    path: "/user",
                    name: "userQ",
                    component: UserQuery
                }
            ]
        });

        // 抛出两个全局的组件 router-link  router-view
        // 抛出了两个对象  $router  $route (路由信息对象)挂载到了Vue实例化对象
        let App = {
            template: `
                <div>
                    <!-- router-link默认会被渲染成a标签，to默认会被渲染成href属性 -->
                    <router-link :to="{name:'userP', params:{id:1}}">userP</router-link>
                    <router-link :to="{name:'userQ', query:{id:1}}">userQ</router-link>

                    <!-- 路由组件的出口 -->
                    <router-view></router-view>
                </div>
            `,
            
        };

        // 将配置好的路由对象关联到vue实例化对象中
        new Vue({
            el: "#app",
            router: router,
            template: `<App />`,
            components: {
                App
            }
        });
	</script>
</body>
</html>
```



### 嵌套路由

+ 子模块 DOM 结构 `不相同`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div id="app"></div>
    <!-- 引包 -->
	<script type="text/javascript" src="vue.js"></script>
    <!-- 引包 引入 核心的插件 vue-router -->
	<script type="text/javascript" src="vue-router.js"></script>
    <script>
        Vue.use(VueRouter);
        // 创建组件
        let Song = {
            template: `<div>Song</div>`,
        };

        let Movie = {
            template: `<div>Movie</div>`,
        };

        let Home ={
            template: `
                <div>
                    <router-link to="/home/song">song</router-link>
                    <router-link to="/home/movie">movic</router-link>
                    <router-view></router-view>
                </div>`
        }

        let router = new VueRouter({
            routes: [
                {
                    path: "/home",
                    component: Home,
                    children: [
                        {
                            // path: "/home/song",
                            path: "song",
                            component: Song,

                        },
                        {
                            path: "/home/movie", 
                            component: Movie,                   
                        }
                    ]
                }
            ]
        });

        let App = {
            template: `
                <div>
                    <router-link to="/home">Home</router-link>
                    <router-view></router-view>
                </div>`,
        };

        new Vue({
            el: "#app",
            router,
            template: `<App />`,
            components: {
                App
            }
        });
    </script>
</body>
</html>
```



### 动态路由

+ 子模块 DOM 结构 `相同`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div id="app"></div>
    <!-- 引包 -->
	<script type="text/javascript" src="vue.js"></script>
    <!-- 引包 引入 核心的插件vue-router -->
	<script type="text/javascript" src="vue-router.js"></script>
    <script>
        let ComDesc = {
            template: `<div>{{ msg }}</div>`,
            data() {
                return {
                    msg: '',
                }
            },
            created() {
                this.msg = 'Android';
            },
            watch: {
                $route: function(to, from) {
                    // 对路由变化作出响应...
                    console.log(to);
                    console.log(from);
                    this.msg = to.params.id;

                }
            }
        };

        let Timeline = {
            template: `
                <div>
                    <router-link :to='{name:"comDesc", params:{id:"Android"}}'>Android</router-link>
                    <router-link :to='{name:"comDesc", params:{id:"Frontend"}}'>Frontend</router-link>
                    <router-view></router-view>
                </div>
            `,
            
        }


        let Pins = {
            template: `<div>Pins</div>`
        };

        const router = new VueRouter({
            routes: [
                {
                    path: 'timeline',
                    name:'timeline',
                    component: Timeline,
                    children: [
                        {
                            path: 'timeline/:id',
                            name:  'comDesc',
                            component: ComDesc,
                            
                        }
                    ] 
                },
                {
                    path: 'pins',
                    name:'pins',
                    component: Pins,
                }
            ]    
        });
        
        let App = {
            template: `
                <div>
                    <router-link :to='{name:"timeline"}'>timeline</router-link>
                    <router-link :to='{name:"pins"}'>pins</router-link>
                    <router-view></router-view>
                </div>
            `,
        };

        new Vue({
            el: '#app',
            router,
            template: `<App />`,
            components: {
                App
            }
        });
    </script>
</body>
</html>
```



### 编程式路由

#### router.push()

除了使用 `<router-link>` 创建 a 标签来定义导航链接，还可以借助 **router 的实例方法**，通过编写代码来实现。

```js
router.push(location, onComplete?, onAbort?)
```

> 注意：在 Vue 实例内部，可以通过 `$router` 访问路由实例。因此可以调用 `this.$router.push`。

 

点击 `<router-link :to="...">` 等同于调用 `router.push(...)`。

| 声明式                    | 编程式             |
| ------------------------- | ------------------ |
| `<router-link :to="...">` | `router.push(...)` |



该方法的参数可以是一个字符串路径，或者一个描述地址的对象。例如：

```js
// 字符串
router.push('home')

// 对象
router.push({ path: 'home' })

// 命名的路由
router.push({ name: 'user', params: { userId: '123' }})

// 带查询参数，变成 /register?plan=private
router.push({ path: 'register', query: { plan: 'private' }})
```

**注意：如果提供了 `path`，`params` 会被忽略，上述例子中的 `query` 并不属于这种情况。取而代之的是下面例子的做法，你需要提供路由的 `name` 或手写完整的带有参数的 `path`：**

```js
const userId = '123'
router.push({ name: 'user', params: { userId }}) // -> /user/123
router.push({ path: `/user/${userId}` }) // -> /user/123
// 这里的 params 不生效
router.push({ path: '/user', params: { userId }}) // -> /user
```



#### router.go(n)

这个方法的参数是一个整数，意思是在 history 记录中向前或者后退多少步，类似 `window.history.go(n)`。

```js
// 在浏览器记录中前进一步，等同于 history.forward()
router.go(1)

// 后退一步记录，等同于 history.back()
router.go(-1)

// 前进 3 步记录
router.go(3)

// 如果 history 记录不够用，失败
router.go(-100)
router.go(100)
```



### meta和router.beforeEach

+ meta

+ 全局路由router.beforeEach

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
	</head>
	<body>
		<div id="app">
			<!-- 声明式的导航 -->
			<router-link to='/home'>首页</router-link>
			<router-link to='/blog'>博客</router-link>
			<router-link to='/login'>登录</router-link>
			<a href="javascript:void(0);" @click='loginout'>退出</a>
			<router-view></router-view>
		</div>

		<script src="vue.js" type="text/javascript" charset="utf-8"></script>
		<script src="vue-router.js" type="text/javascript" charset="utf-8"></script>

		<script type="text/javascript">
			Vue.use(VueRouter);
			let Home = {
				template: `
	
				   <div>
					我是首页
				   </div>
				`
			};

			let Blog = {
				template: `

		   	   <div>
		   	   	我是博客
		   	   </div>
			`
			};

			let Login = {
				template: `
					<div>
						<input type="text" v-model="name">
						<input type="password" v-model="pwd">
						<input type="button" value=" login" @click="login">
					</div>
				`,
				data() {
					return {
						name: "",
						pwd: ""
					};
				},
				methods: {
					login() {
						localStorage.setItem('user', {
							name: this.name,
							pwd: this.pwd
						});

						// 编程式导航
						this.$router.push({
							name: 'blog'
						});

					}
				}
			};


			let router = new VueRouter({
				routes: [{
						path: "/",
						redirect: "/home"
					},
					{
						path: "/home",
						component: Home
					},
					{
						path: "/blog",
						name: "blog",
						component: Blog,
						meta: {
							// 表明用户访问该组件是需要登录
							auth: true
						}
					},
					{
						path: "/login",
						component: Login
					}
				]
			});

			router.beforeEach((to, from, next) => {
				console.log(to);
				console.log(from);
				if (to.meta.auth) { 
                    // 用户点击了博客链接 该用户未登录 需要登录判断 准备跳转登录页面
					if (localStorage.getItem('user')) {
						// 不为空 放行
						next();
					} else {
						// alert(2);
						// 用户需要登录
						next({
							path: '/login'
						});
					}
				} else {
					// 直接放行
					next(); //如果不调用next 就会卡住
				}
			});

			new Vue({
				el: "#app",
				router,
				methods: {
					loginout() {
						localStorage.removeItem('user');
						this.$router.push('/login');
					}
				}
			});
		</script>

	</body>
</html>
```



### keep-alive在路由中的使用

`keep-alive` 是Vue提供的一个抽象组件，用来对组件进行缓存，从而节省性能，由于是一个抽象组件，所以在页面渲染完毕后**不会被渲染成一个DOM元素**

当组件在 `keep-alive` 内被切换时组件的**activated、mounted**这两个生命周期钩子函数会被执行

被包裹在keep-alive中的组件的状态将会被保留, `destroyed` 生命周期钩子函数不会被执行

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
	</head>
	<body>
		<div id="app">

		</div>

		<script src="vue.js" type="text/javascript" charset="utf-8"></script>
		<script src="vue-router.js" type="text/javascript" charset="utf-8"></script>

		<script type="text/javascript">
			Vue.use(VueRouter);

			let Series = {
				template: `
					<div>
						<h3>付费栏目</h3>
					</div>
				`,
				created() {
					console.log('付费栏目组件created');
				},
				mounted() {
					console.log('付费栏目组件mounted');
				},
				destroyed() {
					console.log('付费栏目组件被销毁了')
				}
			};
			let Topics = {
				template: `
					<div>
						<h3 @click = 'clickHandler'>专题广场</h3>
					</div>
				`,
				methods: {
					clickHandler(e) {
						e.target.style.color = 'red';
					}
				},
				created() {
					console.log('专题广场组件created');
				},
				mounted() {
					console.log('专题广场组件mounted');
				},
				destroyed() {
					console.log('专题广场组件被销毁了')
				}
			};

			let router = new VueRouter({
				routes: [{
						path: "/series",
						component: Series
					},
					{
						path: "/topics",
						component: Topics
					}
				]
			});

			let App = {
				template: `
					<div>
						<router-link to = '/series'>付费栏目</router-link>
						<router-link to = '/topics'>专题广场</router-link>
						<keep-alive>
							<router-view></router-view>
						</keep-alive>
					</div>
				`,
			};

			new Vue({
				el: '#app',
				template: `<App />`,
				components: {
					App
				},
				router
			});
		</script>
	</body>
</html>
```



## Vuex



## Vue CLI





## Webpack



