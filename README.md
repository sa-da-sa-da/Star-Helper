# 简介

Star-Helper 是一款集线上、线下课堂管理、班级服务、群助手等功能于一体的教育类管理小程序。

# 小程序模块功能描述

1. 文章/消息（列表）管理模块【已完成】

文章模块实现的功能点：点赞、收藏、评论、文章阅览、点赞数、收藏数、评论数、文章热度、文章标题、文章来源、发布时间、文章内容、快捷置顶、快捷添加笔记、转发等功能点。

文章列表实现的功能点：文章类型、文章标题、文章简介、文章首图、文章关键词、文章来源、发布时间、点赞数、收藏数、评论数、文章热度

消息模块实现的功能点：消息类型、消息标题、消息简介、消息来源、发布时间、关注数、确认数、浏览数

消息列表实现的功能点：消息标题、发布时间、关注数、确认数、浏览数、消息来源、消息内容、快捷置顶、快捷笔记

2. 成员管理【已完成】

班级列表、成员列表、成员信息、保存到通讯录、成员管理。

3. 班级服务【开发中】

【发通知】标题、内容、选择班级、发送人（默认班级管理员），消息推送、消息盒子展示。

【收消息】消息盒子展示、消息推送

【收文件】收集标题、详细描述、文件自动命名（按将会顺序命名）（姓名、学号、...）、文件个数（单文件只创建一个文件夹、多文件讲创建提交者文件夹）、选择班级、截止时间。

【文件下载】选择班级、已经收集的文件、整体下载、单个文件下载

【发文件】发送标题、详细描述、文件（9个以内，单个文件不超过50M）、选择班级、消息推送。

【代办】

【讨论】讨论标题、详细描述、选择班级、消息推送

【投票】

【签到】

【】

4. 线上课堂【计划中】




5. 群助手【计划中】

【群接龙】

【群通知】

【群活动】

【群话题】


# 相关概念

## 云开发

云开发（CloudBase）是云端一体化的后端云服务 ，采用 serverless 架构，免去了移动应用构建中繁琐的服务器搭建和运维。同时云开发提供的静态托管、命令行工具（CLI）、Flutter SDK 等能力降低了应用开发的门槛。使用云开发可以构建完整的小程序/小游戏、H5、Web、移动 App 等应用。

### 云函数

云函数是一段运行在云端的代码，无需管理服务器，在开发工具内编写、一键上传部署即可运行后端代码。

小程序内提供了专门用于云函数调用的 API。开发者可以在云函数内使用 wx-server-sdk 提供的 getWXContext 方法获取到每次调用的上下文（appid、openid 等），无需维护复杂的鉴权机制，即可获取天然可信任的用户登录态（openid）。

### 数据库

云开发提供了一个 JSON 数据库，顾名思义，数据库中的每条记录都是一个 JSON 格式的对象。一个数据库可以有多个集合（相当于关系型数据中的表），集合可看做一个 JSON 数组，数组中的每个对象就是一条记录，记录的格式是 JSON 对象。

### 内容管理（CMS）

内容管理是基于云开发搭建的可视化的内容管理平台，提供了丰富的内容管理功能，开通简单，独立于云控制台，无须编写代码即可使用，支持文本、富文本、Markdown、图片、文件、关联类型等多种类型的可视化编辑，易于二次开发，并与云开发的生态体系紧密结合，助力开发者提升开发效率。

### 静态资源导入

云开发提供了一块存储空间，提供了上传文件到云端、带权限管理的云端下载能力，开发者可以在小程序端和云函数端通过 API 使用云存储功能。在小程序端可以分别调用 wx.cloud.uploadFile 和 wx.cloud.downloadFile 完成上传和下载云文件操作。

### 消息推送 



# 相关模块介绍

# 完整搭建步骤

## 前置条件

1. 注册微信小程序，下载[最新版微信开发工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)，并开通云开发

2. 完善UGC（用户生成内容场景声明）声明、教育类备案申报、用户隐私保护指引等小程序必要合规条件。

3. 在微信公众平台开通订阅消息，并选择以下公共模板库，并配置相关关键词

3.1 一次性订阅消息

|标题|类目|详细内容（关键词）|
|---|---|---|
|活动预约提醒|信息查询|活动名称：{{thing2.DATA}} <br/> 活动日期：{{date3.DATA}}<br/>活动说明：{{thing4.DATA}}<br/>开始时间：{{time8.DATA}}<br/>地址：{{thing10.DATA}}|
||||



3.2 长期订阅消息

```


```

4. 获取代码，导入微信开发工具（需要开通云开发）功能。

4.1 获取代码

```
git clone https://gitee.com/sakay/Star-Helper.git
```

4.2 导入微信开发工具，并开通云开发功能

4.3 进入小程序开发界面


## 管理后台的搭建（云开发 + 内容管理CMS）

1. 打开云开发管理控制台

2. 开通内容管理功能，填写账号、密码

3. 导入数据模型，创建新的数据记录

## 数据库的创建

实现CMS导入后，核查并创建数据表。核对后的数据表、索引、权限设置如下：

|数据表名（区分大小写）|索引|权限|
|---|---|---|
|Article_List|_id|所有用户可读，仅创建者可读写|
|Article_Like|_id|仅创建者可读写|
|Article_Star|_id|仅创建者可读写|
|User|_id|仅创建者可读写|
|Message_List|_id|所有用户可读，仅创建者可读写|


## 云函数的部署

方法一（上传快，操作略多）：

    上传依赖：进入腾讯云云开发控制台，上传 wx-server 的依赖

    上传 `cloudfunctions` 的云函数，需要上传的文件 -> 右键 -> 上传所有文件，绑定相关的层。

方法二（上传快，部署慢，操作简单）：

    上传 `cloudfunctions` 的云函数，需要上传的文件 -> 右键 -> 上传并安装依赖。


## 静态资源导入

将文件夹 `Images` 中的资源导入到云储存。


## 小程序的搭建

1. 修改静态资源链接

2. 修改顶部导航栏数据表记录id

3. 修改小程序名称

4. 

## 体验及交流



### 体验小程序

<table>
  <tr>
    <td align="center"><a href="https://gitee.com/sakay/Star-Helper"><img src="https://6465-demo-8gww0qau03b0af5a-1304763314.tcb.qcloud.la/%E5%B0%8F%E7%A8%8B%E5%BA%8F%E4%BA%8C%E7%BB%B4%E7%A0%81.png?sign=66e24ec82cf40bf422c48c72834ce117&t=1627131341" width="100px;" alt=""/><br /><sub><b>Star-Helper</b></sub></a><br /><a href="#infra-chhpt" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/TencentCloudBase/cloudbase-extension-cms/commits?author=chhpt" title="Code">💻</a> <a href="" title="Documentation">Star-Helper</a></td>
  </tr>
</table>

### 交流群


## 安全能力接入

1. 内容、图片安全API

云函数接入

2. 腾讯云开发控制台内容安全

选择相关的数据库的相关用户生成内容的字段，进行审核

3. 微信云开发控制台内容安全

选择相关的数据库的相关用户生成内容的字段，进行审核

4. 人工审核，处于安全考虑，建议增加人工后台审核机制，以防止涉恐、涉暴、涉黄、涉毒、涉赌等等违法犯罪的信息传播。

# 贡献人员

<table>
  <tr>
    <td align="center"><a href="https://gitee.com/sakay/Star-Helper"><img src="https://moodle-img-video.oss-cn-zhangjiakou.aliyuncs.com/img/%E5%BE%AE%E4%BF%A1%E5%A4%B4%E5%83%8F.jpg" title="Code"></a> <a href="https://avatars.githubusercontent.com/u/56340246?v=4" title="Documentation">颯龘</a></td>
  </tr>
</table>


# 注意

1. 关于静态资源，

# 感谢

[ColorUI](https://github.com/colorui-kit/colorui)
[云开发](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html)
[内容管理](https://github.com/TencentCloudBase/cloudbase-extension-cms)
[微信开放文档](https://developers.weixin.qq.com/miniprogram/dev/framework/)
[Toxml](https://github.com/sbfkcel/towxml)

# 