// Kirim OTP
auth.signInWithPhoneNumber(phoneNumber, recaptchaVerifier)
    .then((confirmationResult) => {
        // Tampilkan form OTP
        document.getElementById('phoneForm').style.display = 'none';
        document.getElementById('otpForm').style.display = 'block';

        // Verifikasi OTP
        document.getElementById('otpForm').addEventListener('submit', function(event) {
            event.preventDefault();
            const otp = document.getElementById('otp').value;

            // Konfirmasi OTP
            confirmationResult.confirm(otp)
                .then((result) => {
                    // Pengguna berhasil login
                    alert('Verifikasi berhasil!');
                    document.getElementById('otpForm').style.display = 'none';
                    document.getElementById('trackSection').style.display = 'block';
                })
                .catch((error) => {
                    console.error('Error verifikasi OTP:', error);
                    alert('Kode OTP salah atau sudah kadaluarsa.');
                });
        });
    })
    .catch((error) => {
        console.error('Error mengirim OTP:', error);
        alert('Gagal mengirim OTP. Pastikan nomor telepon valid.');
    });