import { useMemo, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import TextField from '../components/TextField';
import PrimaryButton from '../components/PrimaryButton';
import ModalMessage from '../components/ModalMessage';
import { validateLogin } from '../utils/validators';

export default function LoginScreen() {
  const [email, setEmail] = useState('usuario@demo.com');
  const [password, setPassword] = useState('Secret123');
  const [touched, setTouched] = useState({ email: false, password: false });
  const [loading, setLoading] = useState(false);
  const [successVisible, setSuccessVisible] = useState(false);
  const HARDCODED_EMAIL = 'usuario@demo.com';
  const HARDCODED_PASSWORD = 'Secret123';

  const errors = useMemo(() => validateLogin({ email, password }), [email, password]);
  const isValid = Object.keys(errors).length === 0;

  function handleSubmit() {
    if (!isValid || loading) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (email === HARDCODED_EMAIL && password === HARDCODED_PASSWORD) {
        setSuccessVisible(true);
      } else {
        Alert.alert('Error', 'Credenciales inválidas');
      }
    }, 700);
  }

  return (
    <View style={styles.root}>
      <View style={styles.card}>
        <Text style={styles.title}>Bienvenido</Text>
        <Text style={styles.subtitle}>Inicia sesión para continuar</Text>

        <TextField
          label="Email"
          value={email}
          onChangeText={setEmail}
          onBlur={() => setTouched((t) => ({ ...t, email: true }))}
          placeholder=""
          keyboardType="email-address"
          autoCapitalize="none"
          error={touched.email ? errors.email : undefined}
        />

        <TextField
          label="Contraseña"
          value={password}
          onChangeText={setPassword}
          onBlur={() => setTouched((t) => ({ ...t, password: true }))}
          placeholder=""
          secureTextEntry
          error={touched.password ? errors.password : undefined}
        />
        

        <PrimaryButton
          title="Entrar"
          onPress={handleSubmit}
          disabled={!isValid}
          loading={loading}
        />
      </View>
      <ModalMessage
        visible={successVisible}
        title="Éxito"
        message="Inicio de sesión exitoso."
        onClose={() => setSuccessVisible(false)}
      />

      <TextField
          label="CORREO: usuario@demo.com CONTRASENA: Secret123"
          
        />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
  },
  subtitle: {
    marginTop: 4,
    marginBottom: 20,
    fontSize: 14,
    color: '#6B7280',
  },
});
