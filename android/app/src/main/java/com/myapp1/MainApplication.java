package com.myapp1;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.pilloxa.backgroundjob.BackgroundJobPackage;
import cn.qiuxiang.react.amap3d.AMap3DPackage;
import cn.qiuxiang.react.geolocation.AMapGeolocationPackage;
import com.reactnativecommunity.webview.RNCWebViewPackage;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import com.reactnativecommunity.viewpager.RNCViewPagerPackage;
import com.reactnativecommunity.slider.ReactSliderPackage;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import cn.jiguang.plugins.push.JPushPackage;
import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {
  private boolean SHUTDOWN_TOAST = false;    
  private boolean SHUTDOWN_LOG = false;   
  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new BackgroundJobPackage(),
            new AMap3DPackage(),
            new AMapGeolocationPackage(),
            new RNCWebViewPackage(),
            new ReactNativePushNotificationPackage(),
            new RNCViewPagerPackage(),
            new ReactSliderPackage(),
            new AsyncStoragePackage(),
          new RNGestureHandlerPackage(),
          new JPushPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
