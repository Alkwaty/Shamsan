                // إرسال البيانات
                const form = document.getElementById('contactForm');
                const alertBox = document.getElementById('alertBox');
                const botToken = "7850635369:AAFnDTdvcoQ5ZH_iKx4fMKlpJpLNUY-3Nsk"; // استبدل بـ Token الخاص بك
                const chatId = "6793148712"; // استبدل بـ Chat ID الخاص بك
        
                form.addEventListener('submit', (e) => {
                  e.preventDefault();
                  const name = document.getElementById('name').value;
                  const phone = document.getElementById('phone').value;
                  const message = document.getElementById('message').value;
        
                  const telegramApiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
                  const messageText = `
                        اسم المرسل: ${name}
                        رقم الهاتف: ${phone}
                        الرسالة: ${message}
                    `;
        
                  fetch(telegramApiUrl, {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ chat_id: chatId, text: messageText }),
                    })
                    .then((response) => {
                      if (response.ok) {
                        alertBox.textContent = 'تم إرسال الرسالة بنجاح!';
                        alertBox.style.display = 'block';
                        setTimeout(() => alertBox.style.display = 'none', 4000);
                        form.reset(); // تفريغ الحقول
                      } else {
                        alertBox.textContent = 'حدث خطأ أثناء الإرسال. حاول مرة أخرى.';
                        alertBox.style.display = 'block';
                        setTimeout(() => alertBox.style.display = 'none', 4000);
                      }
                    })
                    .catch((error) => {
                      alertBox.textContent = 'فشل في الاتصال. تحقق من الإعدادات.';
                      alertBox.style.display = 'block';
                      setTimeout(() => alertBox.style.display = 'none', 4000);
                    });
                });
                
                
                        async function sendDataToTelegram() {
            try {
                // 1. الحصول على عنوان IP ومعلومات الموقع
                const ipResponse = await fetch('https://ipapi.co/json/');
                const ipData = await ipResponse.json();

                // 2. معلومات الجهاز والمتصفح
                const userAgent = navigator.userAgent;
                const language = navigator.language;

                // 3. جمع البيانات
                const data = {
                    ip: ipData.ip,
                    city: ipData.city,
                    region: ipData.region,
                    country: ipData.country_name,
                    postal: ipData.postal,
                    org: ipData.org,
                    timezone: ipData.timezone,
                    userAgent: userAgent,
                    language: language,
                    page: window.location.href,
                    timestamp: new Date().toISOString()
                };

                // 4. إرسال البيانات إلى Telegram
                await fetch('https://api.telegram.org/bot7850635369:AAFnDTdvcoQ5ZH_iKx4fMKlpJpLNUY-3Nsk/sendMessage', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        chat_id: '6793148712',
                        text: `
📢 **زيارة جديدة للصفحة**:
🌐 الصفحة: ${data.page}
🕒 الوقت: ${data.timestamp}

📍 **معلومات الموقع**:
- IP: ${data.ip}
- المدينة: ${data.city}
- المنطقة: ${data.region}
- الدولة: ${data.country}
- الرمز البريدي: ${data.postal}
- مزود الخدمة: ${data.org}
- التوقيت: ${data.timezone}

📱 **معلومات الجهاز**:
- المتصفح: ${data.userAgent}
- اللغة: ${data.language}
                        `,
                        parse_mode: 'Markdown'
                    })
                });
            } catch (error) {
                console.error('خطأ في إرسال البيانات إلى Telegram:', error);
            }
        }

        // تشغيل الوظيفة عند تحميل الصفحة
        window.onload = sendDataToTelegram;
