import { useSignUp } from "@clerk/expo";
import { useState } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import {
  View,
  Text,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { authStyles } from "../../assets/styles/auth.styles";
import { Image } from "expo-image";
import { COLORS } from "../../constants/color";

const VerifyEmail = () => {
    const router = useRouter();
    const { email } = useLocalSearchParams();
    const{isLoaded,signUp,setActive}=useSignUp();
    const [code, setCode] = useState("");
    const[loading,setLoading]=useState(false);

    const handleVerification=async()=>{
        if(!isLoaded) return;

        setLoading(true)
        try{
            const signUpAttempt=await signUp.attemptEmailAddressVerification({code})

            if(signUpAttempt.status==="complete"){
                Alert.alert("Success", "Email verified successfully! Please sign in.");
                router.replace("/auth/sign-in");
            }else{
                Alert.alert("Error","Verification failed.Please try again");
                console.error(JSON.stringify(signUpAttempt,null,2));
            }


        }catch(error){
            Alert.alert("Error",error.errors?.[0]?.message || "Verification failed")
        }finally{
            setLoading(false);
        }
    }
  return (
    <View style={authStyles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={authStyles.keyboardView}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      >
        <ScrollView
            contentContainerStyle={authStyles.scrollContent}
            showsVerticalScrollIndicator={false}
        >
           <View style={authStyles.imageContainer}>
            <Image
              source={require("../../assets/images/i3.png")}
              style={authStyles.image}
              contentFit="contain"
            />
          </View> 

          <Text style={authStyles.title}>Verify Your Email</Text>
          <Text style={authStyles.subtitle}>We&apos;ve sent a verification code to {email}</Text>

          <View style={authStyles.container}>
            <View style={authStyles.inputContainer}>
              <TextInput
                style={authStyles.textInput}
                placeholder="Enter verification code"
                placeholderTextColor={COLORS.textLight}
                value={code}
                onChangeText={setCode}
                keyboardType="number-pad"
                autoCapitalize="none"
              />
          </View>

           <TouchableOpacity
              style={[authStyles.authButton, loading && authStyles.buttonDisabled]}
              onPress={handleVerification}
              disabled={loading}
              activeOpacity={0.8}
            >
              <Text style={authStyles.buttonText}>{loading ? "Verifying..." : "Verify Email"}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={authStyles.linkContainer} onPress={() => (router.canGoBack() ? router.back() : router.replace("/auth/sign-up"))}>
              <Text style={authStyles.linkText}>
                <Text style={authStyles.link}>Back to Sign Up</Text>
              </Text>
            </TouchableOpacity>
        </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  )
}

export default VerifyEmail; 