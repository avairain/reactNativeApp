package com.myapp1;

import com.facebook.react.ReactActivity;

public class SecondActivity extends ReactActivity {

    @Override
    protected String getMainComponentName() {
        // 注意这个名字与 JS 对应的 Component 中 
        // AppRegistry.registerComponent 方法的第一个参数相同
        return "SecondActivity";
    }
}