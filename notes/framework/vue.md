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
  + `v-on`



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
            
        })

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







