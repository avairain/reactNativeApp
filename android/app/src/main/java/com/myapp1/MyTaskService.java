import android.content.Intent;
import android.os.Bundle;
import com.facebook.react.HeadlessJsTaskService;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.jstasks.HeadlessJsTaskConfig;
import com.facebook.react.bridge.WritableMap;

public class MyTaskService extends HeadlessJsTaskService {
   @Override
   protected HeadlessJsTaskConfig getTaskConfig(Intent intent) {
     Bundle extras = intent.getExtras();
     WritableMap data = extras != null ? Arguments.fromBundle(extras) : null;
     return new HeadlessJsTaskConfig(
     "SomeTaskName", // Use the registered headless Task here
     data,
     5000);
  }
}