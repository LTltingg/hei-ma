<template>
  <div class="login">
    <!-- 导航栏 -->
    <van-nav-bar title="登录"/>
    <!-- 表单 -->
    <van-form @submit="onSubmit" ref="loginForm">
      <!--type="number"只能输入数字 maxlength="11"最大长度只能为11 -->
      <van-field
        v-model="user.mobile"
        name="mobile"
        placeholder="请输入手机号"
        class="iphonUser"
        :rules="rules.mobile"
        type="number"
        maxlength="11"
      >
      <!-- 输入框中插槽的用法，手机图标插到输入框中 -->
      <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>
      <van-field
        v-model="user.code"
        name="密码"
        placeholder="请输入密码"
        :rules="rules.code"
        type="number"
        maxlength="6"
      >
      <!-- 输入框中插槽的用法，验证码图标插到输入框中 -->
      <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
      <!-- 插入按钮 -->
      <template #button>
        <!-- 倒计时 -->
        <van-count-down
         :time="1000 * 7"
         format="ss s "
         @finish="isCountDownShow = flase"
         v-if="isCountDownShow"/>
         <van-button
        round size="small"
        type="default"
        class="sendButton"
        native-type="button"
        @click="onSandSms"
        v-else
        >获取验证码</van-button>
      </template>
      </van-field>
      <div class="login-btn-submit">
        <van-button class="login-btn" block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendSms } from '../../api/user'
export default {
  name: 'LoginPage',
  data () {
    return {
      // 手机号验证码
      user: {
        mobile: '',
        code: ''
      },
      isCountDownShow: false,
      // 验证规则
      rules: {
        // 验证规则中手机号验证规则
        mobile: [
          { required: true, message: '手机号不能为空' },
          { pattern: /^1[3|5|7|8]\d{9}$/, message: '手机号输入错误' }
        ],
        // 验证规则中验证码验证规则
        code: [
          { required: true, message: '验证码不能为空' },
          { pattern: /^\d{6}$/, message: '验证码输入错误' }
        ]
      }
    }
  },
  methods: {
    // 登录事件
    async onSubmit () {
      // 1.获取表单数据
      const user = this.user
      // 2.表单验证
      // 3.提交表单请求登录
      // 在组件中必须通过this.$toast来调用
      this.$toast.loading({
        message: '登录中...',
        forbidClick: true,
        duration: 0 // 默认时长是2000ms，如果设置为0则是持续展示
      })
      // 登录接口判定
      try {
        const res = await login(user)
        console.log('登录成功', res)
        // 成功后进行登陆成功提示toast会默认覆盖上一个toast所以会展示成功
        this.$toast.success('登录成功')
      } catch (error) {
        if (error.response.status === 400) {
          console.log('手机号或验证码错误')
        } else {
          console.log('登录失败', error)
          this.$toast.fail('登录失败')
        }
      }
    },
    // 发送验证码事件
    async onSandSms () {
      try {
        // 1.校验表单手机号
        await this.$refs.loginForm.validate('mobile')
        console.log('验证通过')
      } catch (error) {
        return console.log('验证失败', error)
      }
      // 2.验证通过显示倒计时
      this.isCountDownShow = true
      // 3.请求发送验证码
      try {
        await sendSms(this.user.mobile)
        this.$toast('发送成功')
      } catch (error) {
        // 发送失败关闭倒计时
        this.isCountDownShow = false
        if (error.response.status === 429) {
          this.$toast('发送太频繁，请稍后重试')
        } else {
          this.$toast('发送失败，请稍后重试')
        }
      }
    }
  }
}
</script>

<style lang="less">
.login{
  .toutiao{
    font-size: 22px;
  }

  .sendButton{
    background-color: #ededed;
    // width: 152px;
    // height: 46px;
    // line-height: 46px;
    color: #666;
  }
  .login-btn-submit{
    padding: 53px 33px;
    .login-btn{
      background-color: #6db4fb;
      border:none;
      border-radius: 5px;
    }
  }
}
</style>
