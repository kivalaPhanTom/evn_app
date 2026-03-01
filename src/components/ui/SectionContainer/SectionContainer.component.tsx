import GradientText from '@/components/GradientText/GradientText.component'
import { Colors } from '@/core/constants/colors'
import { lightGradients } from '@/core/constants/gradients'
import { GradientColors } from '@/core/types'
import { px } from '@/core/utils/scale'
import { useTheme } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useState, useRef } from "react";
import { Platform } from 'react-native';
import { StyleSheet, View, ViewStyle, Text, TouchableOpacity, Pressable } from 'react-native'
import { Portal } from 'react-native-portalize';
interface optionItem {
  label: string,
  value: string
}
type OnChangeHandler = (val: string) => void;
interface SectionContainerProps {
  title: string
  children: React.ReactNode
  style?: ViewStyle
  showDivider?: boolean
  isShowSelectButton?: boolean
  options?: optionItem[]
  open?: boolean
  selectedValue?: string
  onChangeOption?: OnChangeHandler
  backgroundColor?: string // allow passing custom background color, e.g. 'transparent'
  actionButton?: {
    label: string
    onPress: () => void
  }
}

const SectionContainer: React.FC<SectionContainerProps> = ({
  title,
  children,
  style,
  showDivider = false,
  backgroundColor = 'transparent',
  actionButton,
  isShowSelectButton = false,
  selectedValue = "",
  onChangeOption = null,
  options = []
}) => {
  const theme = useTheme()
  const isDark = theme.dark

  const backgroundColors: GradientColors = backgroundColor
    ? backgroundColor === 'transparent'
      ? ['transparent', 'transparent']
      : [backgroundColor, backgroundColor]
    : isDark
      ? [Colors.darkerGray, Colors.darkerGray]
      : [Colors.white, Colors.lightGray]

  const dividerColor = isDark ? Colors.dividerLight : Colors.black
  const widthLine = '93%'
  const heightLine = 1
  const colorLine = '#7a8596'
  const lineStyle = { marginVertical: 10 }

  const [open, setOpen] = useState(false);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0, width: 0 });
  const buttonRef = useRef<View>(null);
  const selectedLabel =
    options.find((o) => o.value === selectedValue)?.label ?? "";

  const onChange = (val: string) => {
    if (onChangeOption) onChangeOption(val)
  }

  const handleOpenDropdown = () => {
    if (buttonRef.current) {
      buttonRef.current.measureInWindow((x, y, width, height) => {
        setDropdownPos({ top: y + height, left: x, width });
        setOpen(true);
      });
    } else {
      setOpen(true);
    }
  };

  return (
    <LinearGradient
      colors={backgroundColors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.container, style]}
    >
      <View style={styles.gradientBackground}>
        {title && <View style={styles.headerRow}>
          <GradientText
            text={title.toUpperCase()}
            colors={['#fff', '#fff']}
            fontSize={px.m(18)}
            fontWeight="600"
            style={styles.title}
          />
        </View>}

        <View style={styles.rowContainer}>
          <View style={{ position: "relative" }}>
            {
              isShowSelectButton && <View style={styles.wrapper}>
                {/* SELECT BUTTON */}
                <TouchableOpacity
                  ref={buttonRef}
                  activeOpacity={0.8}
                  onPress={handleOpenDropdown}
                >
                  <LinearGradient
                    colors={["#2a2f55", "#1b1f3a"]}
                    style={styles.selectContainer}
                  >
                    <Text style={styles.selectText}>{selectedLabel}</Text>
                    <Text style={styles.arrow}>
                      {open ? "▲" : "▼"}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>

                {/* DROPDOWN */}
                {open && (
                  <Portal>
                    <View
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        zIndex: 9999,
                        elevation: 20,
                      }}
                      pointerEvents="box-none"
                    >
                      {/* Overlay bắt click ngoài */}
                      <Pressable
                        style={[styles.overlay, { zIndex: 1 }]}
                        onPress={() => setOpen(false)}
                      />
                      <View
                        style={[
                          styles.dropdown,
                          {
                            zIndex: 2,
                            position: 'absolute',
                            top: Platform.OS === 'android' ? dropdownPos.top + 20 : dropdownPos.top,
                            left: dropdownPos.left,
                            minWidth: dropdownPos.width,
                          },
                        ]}
                      >
                        {options.map((item) => (
                          <TouchableOpacity
                            key={item.value}
                            style={styles.option}
                            onPress={() => {
                              onChange(item.value);
                              setOpen(false);
                            }}
                          >
                            <Text style={styles.optionText}>
                              {item.label}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    </View>
                  </Portal>
                )}
              </View>
            }

          </View>
      
          {actionButton && (
            <TouchableOpacity onPress={actionButton.onPress} delayPressIn={0} activeOpacity={0.7} style={styles.actionButton}>
              <Text style={styles.actionButtonText}>{actionButton.label}</Text>
              <Text style={styles.actionButtonIcon}>{'>'}</Text>
            </TouchableOpacity>
          )}
        </View>

      </View>
      {showDivider && <View style={[styles.divider, { backgroundColor: dividerColor }]} />}
      <View
        style={[
          styles.content,
          { paddingTop: showDivider ? px.v(16) : 0, paddingBottom: backgroundColor === 'transparent' ? 0 : px.v(16) },
        ]}
      >
        {children}
      </View>
      <View style={[styles.lineContainer, lineStyle]}>
        <LinearGradient
          colors={[`${colorLine}00`, `${colorLine}AA`, `${colorLine}00`]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          locations={[0, 0.5, 1]}
          style={[styles.gradientLine, { width: widthLine, height: heightLine }]}
        />
      </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: px.v(16),
  },
  gradientBackground: {
    padding: px.h(16),
    backgroundColor: 'transparent',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    textAlign: 'left',
    flex: 1,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    // alignSelf: 'flex-end',
    gap: 4,
  },
  actionButtonText: {
    color: '#9CA3AF',
    fontSize: px.m(14),
  },
  actionButtonIcon: {
    color: '#9CA3AF',
    fontSize: px.m(14),
  },
  divider: {
    height: px.v(2),
    width: '100%',
  },
  content: {
    paddingHorizontal: px.h(30),
    marginBottom: px.v(8),
  },
  lineContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradientLine: {
    borderRadius: 1,
  },


  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end", // 👈 đẩy về cuối (bên phải)
  },
  overlay: {
    position: "absolute",
    top: -1000,
    bottom: -1000,
    left: -1000,
    right: -1000,
    zIndex: 1,
  },
  wrapper: {
    position: "relative",
    marginRight: 7
  },
  selectContainer: {
    flexDirection: "row",
    paddingVertical: 8,      // giảm chiều cao
    paddingHorizontal: 14,   // giảm chiều ngang
    borderRadius: 999,
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
  },

  selectText: {
    color: "#EAEAEA",
    fontSize: 16,            // chữ nhỏ lại
    fontWeight: "500",
  },
  dropdown: {
    position: "absolute",
    top: "100%",
    right: 0,              // 👈 căn sát mép trái của nút
    marginTop: 6,

    minWidth: 180,
    backgroundColor: "#22264a",
    borderRadius: 16,
    paddingVertical: 8,
    zIndex: 999,      // 👈 cực quan trọng cho iOS
    elevation: 10,    // 👈 cho Android
  },
  option: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: "flex-start", // 👈 thêm cái này
  },
  optionText: {
    color: "#fff",
    fontSize: 14,
    textAlign: "left", // 👈 đảm bảo căn trái
  },
  arrow: {
    color: "#fff",
    fontSize: 12,
    marginLeft: 6,
  },
})

export default SectionContainer
