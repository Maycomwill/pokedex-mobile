import { createContext, useContext, useEffect, useRef, useState } from "react";
import { Animated, Text, View } from "react-native";

import { cn } from "../utils/tailwindcss-merge";
import Ionicons from "@expo/vector-icons/Ionicons";

const toastVariants = {
  default: "bg-foreground",
  destructive: "bg-red-200 border-2 border-red-500/20",
  success: "bg-emerald-200 border-2 border-emerald-500/20",
  info: "bg-blue-200 border-2 border-blue-500/20",
};
const messageToastVariants = {
  default: "bg-foreground",
  destructive: "text-red-600",
  success: "text-emerald-600",
  info: "text-blue-600",
};

interface ToastProps {
  id: number;
  message: string;
  onHide: (id: number) => void;
  variant?: keyof typeof toastVariants;
  duration?: number;
  showProgress?: boolean;
}
function Toast({
  id,
  message,
  onHide,
  variant = "default",
  duration = 3000,
  showProgress = false,
}: ToastProps) {
  const opacity = useRef(new Animated.Value(0)).current;
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(progress, {
        toValue: 1,
        duration: duration - 1000,
        useNativeDriver: false,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => onHide(id));
  }, [duration]);

  function handleVariantIcon(variant: ToastVariant) {
    switch (variant) {
      case "success":
        return (
          <View className="w-6 absolute left-4 translate-y-1/2 h-6 rounded-full bg-emerald-500 items-center justify-center">
            <Ionicons name="checkmark-outline" size={20} color="white" />
          </View>
        );
      case "info":
        return (
          <View className="w-6 absolute left-4 translate-y-1/2 h-6 rounded-full bg-blue-500 items-center justify-center">
            <Ionicons name="information-outline" size={20} color="white" />
          </View>
        );
      case "destructive":
        return (
          <View className="w-6 absolute left-4 translate-y-1/2 h-6 rounded-full bg-red-500 items-center justify-center">
            <Ionicons name="close" size={20} color="white" />
          </View>
        );
      default:
        return null;
    }
  }

  return (
    <Animated.View
      className={`
        ${toastVariants[variant]}
        m-2 mb-2 p-4 items-center justify-center relative rounded-full shadow-md transform transition-all w-[60%] mx-auto
      `}
      style={{
        opacity,
        transform: [
          {
            translateY: opacity.interpolate({
              inputRange: [0, 1],
              outputRange: [-20, 0],
            }),
          },
        ],
      }}
    >
      {handleVariantIcon(variant)}
      <Text className={`${messageToastVariants[variant]} "font-semibold"`}>
        {message}
      </Text>
      {/* {showProgress && (
        <View className="mt-2 rounded bg-blue-900">
          <Animated.View
            className="bg-red-500 h-2 rounded"
            style={{
              width: progress.interpolate({
                inputRange: [0, 1],
                outputRange: ["0%", "100%"],
              }),
            }}
          />
        </View>
      )} */}
    </Animated.View>
  );
}

type ToastVariant = keyof typeof toastVariants;

interface ToastMessage {
  id: number;
  text: string;
  variant: ToastVariant;
  duration?: number;
  position?: string;
  showProgress?: boolean;
}
interface ToastContextProps {
  toast: (
    message: string,
    variant?: keyof typeof toastVariants,
    duration?: number,
    position?: "top" | "bottom",
    showProgress?: boolean
  ) => void;
  removeToast: (id: number) => void;
}
const ToastContext = createContext<ToastContextProps | undefined>(undefined);

// TODO: refactor to pass position to Toast instead of ToastProvider
function ToastProvider({
  children,
  position = "top",
}: {
  children: React.ReactNode;
  position?: "top" | "bottom";
}) {
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  const toast: ToastContextProps["toast"] = (
    message: string,
    variant: ToastVariant = "default",
    duration: number = 3000,
    position: "top" | "bottom" = "top",
    showProgress: boolean = true
  ) => {
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        text: message,
        variant,
        duration,
        position,
        showProgress,
      },
    ]);
  };

  const removeToast = (id: number) => {
    setMessages((prev) => prev.filter((message) => message.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toast, removeToast }}>
      {children}
      <View
        className={cn("absolute left-0 right-0", {
          "top-[45px]": position === "top",
          "bottom-0": position === "bottom",
        })}
      >
        {messages.map((message) => (
          <Toast
            key={message.id}
            id={message.id}
            message={message.text}
            variant={message.variant}
            duration={message.duration}
            showProgress={message.showProgress}
            onHide={removeToast}
          />
        ))}
      </View>
    </ToastContext.Provider>
  );
}

function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
}

export { ToastProvider, ToastVariant, Toast, toastVariants, useToast };
