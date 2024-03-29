---
title: JS中的Date对象学习
tags:
  - js
  - Date
date: 2023-09-30
cover: https://s2.loli.net/2023/09/30/ZGypeJEsXDtSgcB.jpg
---

# JS 中的 Date 对象学习

> Date 是 js 中的一个内置对象，用于处理日期和时间。

## 常见的日期格式

1. 中国标准时间：Wed Aug 16 2023 08:00:00 GMT+0800 (中国标准时间)
2. 国际统一时间（UTC 格式）：2023-08-16 T16:00:00.000Z
3. 时间戳格式：1692144000000

## 创建时间

> JS 中的 Date 对象不仅仅是一个构造函数，还是一个普通函数，既可以使用 new Date ()的方式初始化为当前系统时间，也可以使用 Date () 函数的方式。

例如：

```js
//1.使用构造函数方式
const newDate = new Date()
//2.使用函数方式
const date = Date()
// 返回的是一个Date对象
console.log(newDate)
// 返回的是表示当前时间的字符串
console.log(date)
```

new Date 可以接收 4 中形式的参数：

### 不传递参数，创建当前日期和时间

```js
let currentDate = new Date()
console.log(currentDate)
//Wed Aug 16 2023 11:00:34 GMT+0800 (中国标准时间)
```

### 传递一个正确的字符串

```js
let dateStr = '2023-08-16'
let date = new Date(dateStr)
console.log(date)
// 输出：Wed Aug 16 2023 08:00:00 GMT+0800 (中国标准时间)
```

### 传递一个时间戳（毫秒）

```js
let timestamp = 1692144000000 // 时间戳  毫秒
let date = new Date(timestamp)
console.log(date) //Wed Aug 16 2023 08:00:00 GMT+0800 (中国标准时间)
```

### 传递年、月、日、时、分、秒、毫秒

```js
// 参数:year, month [, day [, hours [, minutes [, seconds [, milliseconds]]]]]
let date = new Date(2023, 7, 16, 14, 30, 45, 417) // 2023年8月16日14时30分45秒417毫秒
console.log(date) // 输出：Wed Aug 16 2023 14:30:45 GMT+0800 (中国标准时间)
```

- `year` 参数：使用四位数年份，比如 `2000`。如果写成两位数或个位数，则加上 `1900`，即 `10` 代表1910年。如果是负数，表示公元前
- `month`参数：`0`表示一月，依次类推，`11`表示12月
- `day` 参数：`1` 到 `31`。默认值为 `0`
- `hours`参数：`0`到`23`。`0`时表示午夜
- `minutes`参数：`0`到`59`。默认值为`0`
- `seconds`参数：0到59。默认值为`0`
- `milliseconds`参数：`0`到`999`。默认值为 0

### 传递 1 个表示时区偏移量的字符

```js
let date = new Date('Tue Jun 21 2023 14:40:15 UTC+8') // 一个表示时区偏移量的字符串
console.log(date) // 输出：Wed Jun 21 2023 14:40:15 GMT+0800 (中国标准时间)
```

## 静态方法

### Date. now ()方法

返回自 1970 年 1 月 1 日 00：00：00（UTF）到当前时间的毫秒数。

```js
Date.now()
1696005832506
```

### Date. parse ()方法

解析一个表示某个日期的字符串，并返回从1970-1-1 00:00:00 UTC 到当前日期的毫秒数。

格式要求：字符串的格式应该是 `YYYY-MM-DDTHH:mm:ss.sssZ` 格式：

- `YYYY-MM-DD` ：日期：年-月-日
- 字符 `T`：是一个分隔符
- `HH:mm:ss.sss`：时间：小时，分钟，秒，毫秒
- 可选字符 `Z`：为 `+-hh:mm` 格式的时区。单个字符 `Z` 代表 UTC+0 时区

简短的形式也是可以的，比如 YYYY-MM-DD，也可以是 YYYY-MM 或者 YYYY

```js
Date.parse(2023)
1672531200000
```

### Date. UTC 方法

返回指定日期与 1970 年 1 月 1 日之间的毫秒数，UTC 时间与 GMT 时间相同

语法：

> _Date_.UTC(_year_, _month_, _day_, _hours_, _minutes_, _seconds_, _millisec_)

```js
Date.UTC(1971)
// 31536000000
```

## 获取方法

### getDate()

获取一个月中的某一天

```js
new Date().getDate() //26
```

### getDay()

获取当前是星期几：

```js
new Date().getDay() //4
//0-6，0代表的是星期天
```

### getFullYear()

获取年份：

```js
new Date().getFullYear() //2023
```

### getHours()

获取小时数：

```js
new Date().getHours() //14
```

### getMilliseconds()

获取当前的毫秒数：

```js
new Date().getMilliseconds() //487
```

### getMinutes()

获取分钟数：

```js
new Date().getMinutes() //32
```

### getMonth()

获取月份：0 代表 1 月

```js
new Date().getMonth() //9 其实现在是10月
```

### getSeconds()

获取秒数：

```js
new Date().getSeconds() //33
```

### getTime()

获取毫秒数：

```js
new Date().getTime() //1698302045279
```

## 设置方法

### setFullYear

根据本地时间为一个日期对象设置年份：

> 语法：dateObj.setFullYear(yearValue[, monthValue[, dayValue]])

```js
const date = new Date()
console.log(date) //Thu Oct 26 2023 14:39:25 GMT+0800 (中国标准时间)
date.setFullYear(2000)
console.log(date) //Thu Oct 26 2000 14:39:47 GMT+0800 (中国标准时间)
```

### setMonth

根据本地时间为一个日期对象设置月份：

### setDate

根据本地时间来指定一个日期对象的天数

### setHours

根据本地时间为一个日期对象设置小时数

### setMinutes

根据本地时间为一个日期对象设置分钟数

### setSeconds

根据本地时间设置一个日期对象的秒数

### setMilliseconds

根据本地时间设置一个日期对象的豪秒数

### setTime

从 1970-1-1 00:00:00 UTC 计时的毫秒数为来为 `Date` 对象设置时间

## 格式化方法

### toString

返回Date对象的字符串形式

### toDateString

返回Date对象“日期”部分（*年月日* ）的字符串形式

### toTimeString

返回Date对象“时间”部分（*时分秒* ）的字符串形式

### toLocaleString

基于本地时间格式，返回Date对象的字符串形式

### toLocaleDateString

基于本地时间格式，返回Date对象“ 日期”部分（*年月日* ）的字符串形式

### toLocaleTimeString

基于本地时间格式，返回Date对象“时间”部分（*时分秒* ）的字符串形式

### toGMTString

基于GMT时间格式，返回Date对象的字符串形式

### toUTCString

基于UTC时间格式，返回Date对象的字符串形式

## 获取时间戳的常用几种方法

- +new Date()
- new Date.getTime()
- new Date().valueOf()
