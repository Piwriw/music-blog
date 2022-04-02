## 项目介绍

- 这是一个仿网易云的微信小程序项目，目前更新时间为```2022.2.28```，期间2020年微信小程序以及不再维护```getUserInfo```接口的问题，进行过修复。


## 项目效果

<div>
<img src=https://cdn.jsdelivr.net/gh/Piwriw/PicGo/image/20220228211441.png  width=30%/>
<img src=https://cdn.jsdelivr.net/gh/Piwriw/PicGo/image/20220228211505.png width=30%>
<img src=https://cdn.jsdelivr.net/gh/Piwriw/PicGo/image/20220228212605.png width=30%>
</div>
<div>
<img src=https://cdn.jsdelivr.net/gh/Piwriw/PicGo/image/20220228214152.png width=60%>
<img src=https://cdn.jsdelivr.net/gh/Piwriw/PicGo/image/20220228214246.png width=60%>
<img src=https://cdn.jsdelivr.net/gh/Piwriw/PicGo/image/20220228214343.png width=60%>


</div>

## 项目结构介绍


- music-blog:微信小程序端
- music-blog-admin-backend:网页端后台项目
- music-blog-admin-frontend：网页端前端项目
- NeteaseCloudMusicApi：[网易云api项目](https://github.com/Binaryify/NeteaseCloudMusicApi)


## 安装准备

- 1. node.js环境8.12以上，并且配备npm
- 2. 云主机一台
- 3. 已经开通了微信云开放环境

## 安装步骤

### wx端安装

- 1. [网易云api项目](https://github.com/Binaryify/NeteaseCloudMusicApi)，根据NeteaseCloudMusicApi介绍，在自己的云主机部署NeteaseCloudMusicApi项目，推荐使用docker，并且在云主机上开放端口3000
- 2. 下载本项目到本地
- 3. 修改WX端-URL:![20220228205830](https://cdn.jsdelivr.net/gh/Piwriw/PicGo/image/20220228205830.png)
     ![20220228205931](https://cdn.jsdelivr.net/gh/Piwriw/PicGo/image/20220228205931.png)
- 4. 修改WX端-云环境id：![20220228210106](https://cdn.jsdelivr.net/gh/Piwriw/PicGo/image/20220228210106.png)  
- 5. 在云开发中新建三个文件夹![20220228210308](https://cdn.jsdelivr.net/gh/Piwriw/PicGo/image/20220228210308.png)
- 6. 上传所有云函数


### 网页端安装

- 1. 在vscode中打开music-blog-admin-backend项目，打开命令窗口输入(windows系统中请使用管理员身份打开)

```
npm install
```

- 2. 在app.js中输入你的云环境id![20220228210938](https://cdn.jsdelivr.net/gh/Piwriw/PicGo/image/20220228210938.png)
- 3. 在微信开放平台，获取微信小程序id和密钥，并且在getAccessToken中安装![20220228211137](https://cdn.jsdelivr.net/gh/Piwriw/PicGo/image/20220228211137.png)


## 启动项目

```
1. 在后端项目中输入 node app.js 启动后端项目
2. 在前端项目中输入 npm run dev 启动前端项目
```
