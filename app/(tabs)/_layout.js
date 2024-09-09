import React, { useState, useEffect } from 'react';
import { View, Button, Dimensions, StyleSheet, Image, TextInput, Platform, StatusBar, KeyboardAvoidingView, useWindowDimensions } from 'react-native';

const App = () => {
  const { width, height } = useWindowDimensions(); // Sử dụng hook useWindowDimensions để lấy kích thước màn hình
  const [orientation, setOrientation] = useState(width > height ? 'landscape' : 'portrait'); // Đặt hướng màn hình dựa trên kích thước

  useEffect(() => {
    const updateOrientation = () => {
      const { width, height } = Dimensions.get('window');
      setOrientation(width > height ? 'landscape' : 'portrait');
    };

    Dimensions.addEventListener('change', updateOrientation); // Lắng nghe sự thay đổi của hướng màn hình

    return () => {
      Dimensions.removeEventListener('change', updateOrientation);
    };
  }, []);

  const buttonWidth = width / 2; // Mỗi nút bấm chiếm nửa chiều rộng màn hình
  const imageWidth = width * 0.8; // Hình ảnh chiếm 80% chiều rộng màn hình
  const imageHeight = orientation === 'portrait' ? imageWidth * 0.6 : imageWidth * 0.3; // Tỷ lệ chiều cao thay đổi dựa theo hướng màn hình

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      {/* Tùy chỉnh StatusBar */}
      <StatusBar
        barStyle={orientation === 'portrait' ? 'dark-content' : 'light-content'}
        backgroundColor={orientation === 'portrait' ? '#4C2113' : '#FEEB82'}
      />
      
      {/* Hiển thị hình ảnh với kích thước động */}
      <Image
        source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRPfYZyHY6xHW1Ya1nRJm50BShJdzlU5NmdG8S_Lj9oahBcP_IBdRE-t8-wFAWsBzT0cA&usqp=CAU' }}
        style={{ width: imageWidth, height: imageHeight }}
      />

      {/* Hiển thị các nút bấm */}
      <View style={orientation === 'portrait' ? styles.portraitContainer : styles.landscapeContainer}>
        <View style={[styles.button, { width: buttonWidth }]}>
          <Button title="Nút 1" onPress={() => {}} />
        </View>
        <View style={[styles.button, { width: buttonWidth }]}>
          <Button title="Nút 2" onPress={() => {}} />
        </View>
      </View>

      {/* Trường nhập liệu */}
      <TextInput style={styles.input} placeholder="Nhập nội dung" />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
  },
  portraitContainer: {
    flexDirection: 'column', // Nút xếp theo chiều dọc
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  landscapeContainer: {
    flexDirection: 'row', // Nút nằm cạnh nhau
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button: {
    padding: Platform.select({ // Tùy chỉnh padding cho từng nền tảng
      ios: 20,
      android: 10,
    }),
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginTop: 20,
    width: '80%',
    alignSelf: 'center',
  },
});

export default App;
