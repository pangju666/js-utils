https://img.shields.io/badge/{徽标标题}-{徽标内容}-{徽标颜色}.svg

// eg
![build](https://img.shields.io/badge/build-passing-success.svg)

https://img.shields.io/github/issues/{github用户名}/{仓库名}.svg
https://img.shields.io/github/forks/{github用户名}/{仓库名}.svg
https://img.shields.io/github/stars/{github用户名}/{仓库名}.svg
https://img.shields.io/github/license/{github用户名}/{仓库名}.svg

# js-utils开发文档

此工具主要由typescript编写而成，目的在于减少日常开发中的一些重复性和样板式代码。
如果你在使用过程中，发现了一些错误，请[及时反馈](https://github.com/pangju666/js-utils/issues) ，谢谢！！！

[TOC]

## ObjectUtils（对象工具类）
### isExist
#### 说明
>判断对象是否存在，若为`undefined`则返回`false`，否则返回`true`
#### 用法
```javascript
// CommonJS
const ObjectUtils = require('@pangju666/js-utils/ObjectUtils')
// ESM
import { ObjectUtils } from '@pangju666/js-utils'
```
#### 句法
`isExist(value: unknown): boolean`
#### 参数
| 名称 | 类型 | 描述 |
| --- | ---- | --- |
| value | * | 待检查对象　|
#### 返回
|  类型   | 描述  |
|  ----  | ----  |
| `Boolean` | 如果对象存在则返回`true`，否则返回`false` |
#### 异常
|  类型   | 描述  |
|  ----  | ----  |
| 无 | 无 |
#### 样例代码
```javascript
const val2 = undefined
ObjectUtils.isExist(val2) // return false

const val1 = null
ObjectUtils.isExist(val1) // return true

const val3 = 2
ObjectUtils.isExist(val3) // return true

const val4 = ''
ObjectUtils.isExist(val4) // return true

const val5 = {}
ObjectUtils.isExist(val5) // return true
```

### isNotExist
#### 说明
>判断对象是否存在，若为`undefined`则返回`true`，否则返回`false`
#### 用法
```javascript
// CommonJS
const ObjectUtils = require('@pangju666/js-utils/ObjectUtils')
// ESM
import { ObjectUtils } from '@pangju666/js-utils'
```
#### 句法
`isNotExist(value: unknown): boolean`
#### 参数
| 名称 | 类型 | 描述 |
| --- | ---- | --- |
| value | * | 待检查对象　|
#### 返回
|  类型   | 描述  |
|  ----  | ----  |
| `Boolean` | 如果对象存在则返回`false`，否则返回`true` |
#### 异常
|  类型   | 描述  |
|  ----  | ----  |
| 无 | 无 |
#### 样例代码
```javascript
const val2 = undefined
ObjectUtils.isExist(val2) // return true

const val1 = null
ObjectUtils.isExist(val1) // return false

const val3 = 2
ObjectUtils.isExist(val3) // return false

const val4 = ''
ObjectUtils.isExist(val4) // return false

const val5 = {}
ObjectUtils.isExist(val5) // return false
```

### isNull
#### 说明
>判断对象是否为空，若为`null`或`undefined`则返回`true`，否则返回`false`
#### 用法
```javascript
// CommonJS
const ObjectUtils = require('@pangju666/js-utils/ObjectUtils')
// ESM
import { ObjectUtils } from '@pangju666/js-utils'
```
#### 句法
`isNull(value: unknown): boolean`
#### 参数
| 名称 | 类型 | 描述 |
| --- | ---- | --- |
| value | * | 待检查对象　|
#### 返回
|  类型   | 描述  |
|  ----  | ----  |
| `Boolean` | 如果对象为空则返回`true`，否则返回`false` |
#### 异常
|  类型   | 描述  |
|  ----  | ----  |
| 无 | 无 |
#### 样例代码
```javascript
const val2 = undefined
ObjectUtils.isNull(val2) // return true

const val1 = null
ObjectUtils.isNull(val1) // return true

const val3 = 2
ObjectUtils.isNull(val3) // return false

const val4 = ''
ObjectUtils.isNull(val4) // return false

const val5 = {}
ObjectUtils.isNull(val5) // return false
```

### isNotNull
#### 说明
>判断对象是否为空，若为`null`或`undefined`则返回`false`，否则返回`true`
#### 用法
```javascript
// CommonJS
const ObjectUtils = require('@pangju666/js-utils/ObjectUtils')
// ESM
import { ObjectUtils } from '@pangju666/js-utils'
```
#### 句法
`isNull(value: unknown): boolean`
#### 参数
| 名称 | 类型 | 描述 |
| --- | ---- | --- |
| value | * | 待检查对象　|
#### 返回
|  类型   | 描述  |
|  ----  | ----  |
| `Boolean` | 如果对象为空则返回`false`，否则返回`true` |
#### 异常
|  类型   | 描述  |
|  ----  | ----  |
| 无 | 无 |
#### 样例代码
```javascript
const val2 = undefined
ObjectUtils.isNull(val2) // return false

const val1 = null
ObjectUtils.isNull(val1) // return false

const val3 = 2
ObjectUtils.isNull(val3) // return true

const val4 = ''
ObjectUtils.isNull(val4) // return true

const val5 = {}
ObjectUtils.isNull(val5) // return true
```

### isExistProperty
#### 说明
>判断对象属性是否存在，若为`undefined`则返回`false`，否则返回`true`
#### 用法
```javascript
// CommonJS
const ObjectUtils = require('@pangju666/js-utils/ObjectUtils')
// ESM
import { ObjectUtils } from '@pangju666/js-utils'
```
#### 句法
`isExistProperty(object: object, expression: string): boolean`
#### 参数
| 名称 | 类型 | 描述 | 默认值|
| --- | ---- | --- | --- |
| object | object | 待检查对象　| 无 |
| expression | string | 属性表达式　| '' |
#### 返回
|  类型   | 描述  |
|  ----  | ----  |
| `Boolean` | 如果对象属性存在则返回`true`，否则返回`false` |
#### 异常
|  类型   | 描述  |
|  ----  | ----  |
| `TypeError` | 参数expression必须为`string`类型 |
#### 样例代码
```javascript
const val2 = undefined
ObjectUtils.isExistProperty(val2) // return false

const val1 = null
ObjectUtils.isExistProperty(val1) // return false

const val3 = {}
ObjectUtils.isExistProperty(val3, 'test') // return false

const val4 = {test: ''}
ObjectUtils.isExistProperty(val4), 'test2' // return false

const val4 = {test: ''}
ObjectUtils.isExistProperty(val4, 'test') // return true

const val4 = {test: {val: ''}}
ObjectUtils.isExistProperty(val4, 'test.val') // return true

const val4 = {test: {val: ''}}
ObjectUtils.isExistProperty(val4, 'test.val2') // return false
```

### isNotExistProperty
#### 说明
>判断对象属性是否存在，若为`undefined`则返回`false`，否则返回`true`
#### 用法
```javascript
// CommonJS
const ObjectUtils = require('@pangju666/js-utils/ObjectUtils')
// ESM
import { ObjectUtils } from '@pangju666/js-utils'
```
#### 句法
`isNotExistProperty(object: object, expression: string): boolean`
#### 参数
| 名称 | 类型 | 描述 | 默认值|
| --- | ---- | --- | --- |
| object | object | 待检查对象　| 无 |
| expression | string | 属性表达式　| '' |
#### 返回
|  类型   | 描述  |
|  ----  | ----  |
| `Boolean` | 如果对象属性存在则返回`false`，否则返回`true` |
#### 异常
|  类型   | 描述  |
|  ----  | ----  |
| `TypeError` | 参数expression必须为`string`类型 |
#### 样例代码
```javascript
const val2 = undefined
ObjectUtils.isNotExistProperty(val2) // return true

const val1 = null
ObjectUtils.isNotExistProperty(val1) // return true

const val3 = {}
ObjectUtils.isNotExistProperty(val3, 'test') // return true

const val4 = {test: ''}
ObjectUtils.isNotExistProperty(val4), 'test2' // return true

const val4 = {test: ''}
ObjectUtils.isNotExistProperty(val4, 'test') // return false

const val4 = {test: {val: ''}}
ObjectUtils.isNotExistProperty(val4, 'test.val') // return false

const val4 = {test: {val: ''}}
ObjectUtils.isNotExistProperty(val4, 'test.val2') // return true
```
