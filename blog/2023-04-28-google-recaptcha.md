---
authors: [qsc]
tags: [工具库,验证]
---



# React项目中使用Google reCAPTCHA

## 一. 注册密钥

首先，你需要在 Google reCAPTCHA 网站（https://www.google.com/recaptcha/admin/create）上注册并获取 API 密钥。完成注册后，你将获得一个 `siteKey` 和一个 `secretKey`，这些信息将用于在前端和后端验证 reCAPTCHA 响应。



## 二. 安装 reCAPTCHA 包

```bash title="npm"
npm install react-google-recaptcha
```

```bash title="yarn"
yarn add react-google-recaptcha
```

## 三. 使用

```jsx title="部分代码示意"
import ReCAPTCHA from 'react-google-recaptcha'
...

const recaptchaRef = useRef(null) // 可以获取到 recaptcha 自带的方法
/**
* 验证用户是否完成了验证码测试的方法 execute: 
* recaptchaRef.current.execute()
* 
* 服务重新启动的方法 reset: 
* recaptchaRef.current.reset();
*/

const [isVertified, setIsVertified] = useState(false) // 是否已经验证
const [recaptcha, setRecaptcha] = useState('') // 验证码存储, 如果遇到不想更新视图的场景, 考虑使用 useRef 储存

const onChange = (value) => {
  // 拿到用户点击后的验证码, 通常需要后端接收这个验证码, 所以其一般是请求体的某个字段值
  if (value) {
    setIsVertified(true)
    setRecaptcha(value)
  }
}

...
return (
	<>
    <ReCAPTCHA
      ref={recaptchaRef}
      // size="invisible"
      sitekey={REACT_APP_RECAPTCHA_KEY}
      onChange={onChange}
    />
    <Button disabled={!isVertified}>
        Submit
    </Button>
  </>
)


```

