---
title: vite部署线上报MIME类型错误
authors: [qsc]
tags: [vite,amplify]
---


## 错误如下

```
Failed to load module script: Expected a JavaScript module script but the server responded with a MIME type of "application/octet-stream".  Strict MIME type checking is enforced for module scripts per HTML spec.
```

## 配置文件解决

> 注意: 添加头的方法在 `amplify.yml` 可能有用, 但是主要是看你构建目录是否正确, 亚马逊配置如果目录不对, 有时候可以构建成功! Vite 默认构建目录是 `dist` , CRA默认构建目录是 `build` 

使用“customHeaders”属性配置了所有 JavaScript 文件的 MIME 类型为“application/javascript”。

![vite-amplify-error.png](./img/vite-amplify-error.png)

## nginx解决

```
types {
    application/javascript  js;
}
```

还找到这个[解决方法](https://kas.kim/blog/failed-to-load-module-script)

```
sudo vi /etc/nginx/mime.types
```

找到或者补充这一行

```
application/javascript js
```

在末尾添加

```
application/javascript js mjs
```

重启nginx

```
sudo nginx -s reload
```



## Apache 服务器解决

```
AddType application/javascript .js
```

