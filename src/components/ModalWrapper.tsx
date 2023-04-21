import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  Dimensions,
} from 'react-native';

import { Colors } from '@themes';

export type ModalWrapperProps = {
  visible: boolean;
  onClose: () => void;
  children?: JSX.Element;
};

const ModalWrapper = (props: ModalWrapperProps): JSX.Element => {
  const { visible, children, onClose } = props;

  return (
    <Modal visible={visible} transparent animationType='fade'>
      <View style={styles.modal}>
        <TouchableOpacity onPress={onClose} style={styles.overlay} />
        <View style={styles.modalContent}>
          {children}
        </View>
      </View>
    </Modal>
  );
};

export default ModalWrapper;

const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    height: screenHeight,
    width: screenWidth,
    backgroundColor: Colors.black,
    opacity: 0.2,
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderRadius: 16,
  },
});
