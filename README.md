# 📝 Assignment Automation - AI Ýazuw Ýardamçysy

OpenRouter AI (DeepSeek modeli) bilen işleýän professional ýazuw işlerini awtomatlaşdyrýan web programmasy. Makala, gözleg işleri, hasabatlar we beýleki akademiki işleri çalt we hilli döretmek üçin niýetlenen.

![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)
![Flask](https://img.shields.io/badge/Flask-3.0.0-green.svg)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)

## ✨ Esasy Aýratynlyklar

### 🎯 Ýazuw Döretmek
- **Makala (Essay)** - doly formatly makala ýazuw
- **Research Paper** - ylmy gözleg işleri
- **Report** - professional hasabatlar
- **Summary** - gysgaça jemlemeler
- **Analysis** - seljermeler we derňewler

### 🔧 Tekst Gowulandyrmak
- **Grammatika düzediş** - ýalňyşlyklary tapyp düzedýär
- **Aýdyňlyk artdyrmak** - tekstiň düşnükliligini ýokarlandyrýar
- **Akademiki stil** - ylmy we professional ýazuw stiline geçirýär
- **Giňişleýin** - tekstiň mazmunyny baýlaşdyrýar

### 🌍 Köp dilli goldaw
- 🇹🇲 Türkmençe
- 🇬🇧 Iňlisçe
- 🇷🇺 Rusça

### 🎨 Owadan Dizaýn
- Modern gradient dizaýn
- Animasiýalar we geçişler
- Responsive - telefonda hem işleýär
- Markdown formatlaryny HTML-e öwürýär
- Göçür we göçürip al funksiýalary

## 📁 Taslama Gurluşy

```
assignment-automation/
├── backend/
│   ├── app.py              # Flask backend server
│   └── requirements.txt    # Python paketleri
├── frontend/
│   ├── index.html          # Esasy sahypa
│   ├── style.css           # Stillendiriş
│   └── script.js           # Frontend logikasy
└── README.md               # Bu faýl
```

## 🚀 Gurnama we Işe Goýmak

### Zerur Programmalar

- Python 3.8 ýa-da has täze wersiýasy
- pip (Python paket dolandyryjysy)
- OpenRouter API açary

### 1️⃣ Repository-ny Klonlamak

```bash
git clone https://github.com/Ysmayylow01/assignment-automation.git
cd assignment-automation
```

### 2️⃣ Backend Gurnama

```bash
# Backend papkasyna giriň
cd backend

# Virtual environment dörediň
python -m venv venv

# Virtual environment-i işe goýuň
# Windows üçin:
venv\Scripts\activate
# Linux/Mac üçin:
source venv/bin/activate

# Gerekli paketleri guruň
pip install -r requirements.txt
```

### 3️⃣ OpenRouter API Açar Almak

1. [OpenRouter.ai](https://openrouter.ai) saýtyna giriň
2. Hasap açyň ýa-da giriň
3. **API Keys** bölümine gidiň
4. **Create Key** düwmesine basyň
5. Açaryňyzy kopy ediň

### 4️⃣ API Açaryny Sazlamak

**Windows üçin:**
```bash
set OPENROUTER_API_KEY=your-actual-api-key-here
```

**Linux/Mac üçin:**
```bash
export OPENROUTER_API_KEY=your-actual-api-key-here
```

**Ýa-da .env faýl ulanyp:**
```bash
# backend/.env faýl dörediň
OPENROUTER_API_KEY=your-actual-api-key-here
```

### 5️⃣ Backend-i Işe Goýmak

```bash
# backend papkasynda
python app.py
```

Backend `http://localhost:5000` salgysynda işe başlar.

### 6️⃣ Frontend-i Açmak

**Usul 1: Göni brauzerda açmak**
```bash
# Täze terminal açyň
cd frontend
# index.html faýlyny brauzerde açyň
```

**Usul 2: HTTP server bilen (maslahat berilýär)**
```bash
# frontend papkasynda
python -m http.server 8000
```

Soňra brauzerden `http://localhost:8000` salgysyna giriň.

## 📖 Ulanyş Görkezmeleri

### Täze Iş Döretmek

1. **"Täze Döret"** tabyna basyň
2. **Tema/Mowzuk** giriziň (mysal: "Türkmenistanyň tebigaty")
3. **Iş görnüşini** saýlaň (Esse, Gözleg, Hasabat, Gysgaça, Seljerme)
4. **Söz sanyny** belläň (100-5000 aralygy)
5. **Dili** saýlaň (Türkmençe, Iňlisçe, Rusça)
6. **"Döret"** düwmesine basyň
7. Netije owadan formatda görkeziler

### Teksti Gowulandyrmak

1. **"Gowulandyr"** tabyna basyň
2. Gowulandyrjak tekstiňizi giriziň
3. **Gowulandyryş görnüşini** saýlaň
4. **"Gowulandyr"** düwmesine basyň
5. Gowulandyrylan tekst görkeziler

### Netije bilen Işlemek

- 📋 **Göçür** - tekstiň arassasyny clipboard-a göçürýär
- 💾 **Göçürip al** - .txt faýl hökmünde kompýuteriňize ýükleýär

## 🔧 API Endpoints

### POST `/api/generate`

Täze iş döredýär.

**Request Body:**
```json
{
  "topic": "Türkmenistanyň tebigaty",
  "type": "essay",
  "wordCount": 500,
  "language": "turkmen"
}
```

**Response:**
```json
{
  "success": true,
  "content": "Döredilen tekst...",
  "topic": "Türkmenistanyň tebigaty",
  "type": "essay"
}
```

### POST `/api/improve`

Tekstiň hilini ýokarlandyrýar.

**Request Body:**
```json
{
  "text": "Gowulandyrjak tekst...",
  "improvementType": "grammar"
}
```

**Response:**
```json
{
  "success": true,
  "improvedText": "Gowulandyrylan tekst..."
}
```

## 🛠️ Tehnologiýalar

### Backend
- **Flask 3.0.0** - Python web framework
- **Flask-CORS 4.0.0** - Cross-origin resource sharing
- **Requests 2.31.0** - HTTP library

### Frontend
- **HTML5** - Sahypa gurluşy
- **CSS3** - Dizaýn we animasiýalar
- **Vanilla JavaScript** - Interaktiw funksiýalar

### AI Model
- **DeepSeek Chat** - OpenRouter arkaly
- **OpenRouter API** - AI model gateway

## 🎨 Markdown Formatlaýyş Goldawy

Program şu formatlary HTML-e öwürýär:

| Markdown | HTML Netijesi |
|----------|---------------|
| `# Baş at` | `<h1>Baş at</h1>` |
| `## Baş at` | `<h2>Baş at</h2>` |
| `### Baş at` | `<h3>Baş at</h3>` |
| `**bold**` | `<strong>bold</strong>` |
| `*italic*` | `<em>italic</em>` |
| `- element` | `<ul><li>element</li></ul>` |
| `1. element` | `<ol><li>element</li></ol>` |
| `` `kod` `` | `<code>kod</code>` |
| `[link](url)` | `<a href="url">link</a>` |
| `---` | `<hr>` |

## 🐛 Meseleleri Çözmek

### Backend işlemeýär
```bash
# Virtual environment işleýändigini barlañ
which python  # Linux/Mac
where python  # Windows

# Paketler gurlanmy?
pip list | grep Flask
```

### API açar işlemeýär
```bash
# Açar dogry goýlandymy?
echo $OPENROUTER_API_KEY  # Linux/Mac
echo %OPENROUTER_API_KEY%  # Windows
```

### CORS ýalňyşlygy
Frontend we backend dürli portlarda işleýän bolsa, Flask-CORS gurlanan bolmaly.

### Frontend backend bilen baglanyşyp bilmeýär
`script.js` faýlynda `API_URL` salgysy dogrudygyny barlañ:
```javascript
const API_URL = 'http://localhost:5000/api';
```

## 📊 Çäklendirmeler

- **Söz sany**: 100-5000 söz aralygy
- **API çäklendirmeleri**: OpenRouter plan esasynda
- **Model**: DeepSeek Chat (OpenRouter arkaly)

## 🔐 Howpsuzlyk

- API açarlary asla GitHub-a ýüklemäň
- `.env` faýly `.gitignore`-da bolmaly
- HTTPS ulanmak maslahat berilýär (production üçin)

## 🤝 Goşant Goşmak

1. Fork ediň
2. Feature branch dörediň (`git checkout -b feature/AmazingFeature`)
3. Üýtgetmeleriňizi commit ediň (`git commit -m 'Add AmazingFeature'`)
4. Branch-a push ediň (`git push origin feature/AmazingFeature`)
5. Pull Request açyň

## 📝 Licensiýa

Bu taslama MIT Licensiýasy astynda paýlanýar. Jikme-jik maglumat üçin `LICENSE` faýlyna serediň.

## 👨‍💻 Awtor

**Merdan Ysmayylov**
- GitHub: [@Ysmayylow Merdan](https://github.com/Ysmayylow01)
- Email: merdanysmayylow25@gmail.com

## 🙏 Minnetdarlyk

- [OpenRouter](https://openrouter.ai) - AI API gateway
- [DeepSeek](https://www.deepseek.com) - AI model
- [Flask](https://flask.palletsprojects.com) - Web framework

## 📞 Goldaw

Soraglaryňyz bar bolsa:
- Issue açyň: [GitHub Issues](https://github.com/Ysmayylow01/assignment-automation/issues)
- Email: merdanysmayylow25@gmail.com

---

⭐ Bu taslamany halaýan bolsañyz, GitHub-da ýyldyz goýuň!

**Üstünlikli ýazuw işleri!** 📝✨