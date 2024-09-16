# OMDb API Backend Projesi

Bu proje, OMDb API ile etkileşim kurarak bir anahtar kelimeye dayalı film sonuçlarını arayan bir Node.js tabanlı uygulamadır. Harici API'den verileri verimli bir şekilde alır, sonuçları önbelleğe alır ve arama ile önbelleği temizleme için uç noktalar (endpoint) sağlar.

## Özellikler

1. **Arama Uç Noktası** (`/api/search?keyword=foo`):
   - Anahtar kelimeyi sorgu parametresi olarak kabul eder.
   - OMDb API'sine iki istek yaparak ilk 20 sonucu döndürür (API her seferinde yalnızca 10 sonuç döndürür).
   - Arama sonuçlarını süresiz olarak önbelleğe alır ve aynı arama yapıldığında önbellekten sunar.
   - 30 saniye içinde aynı anahtar kelime ile yapılan isteklerde, HTTP önbellekleme kullanarak sunucuya gitmeden sonuçları döndürür.

2. **Önbelleği Temizleme Uç Noktası** (`/api/clear`):
   - Sunucu önbelleğini temizler ve böylece gelecekteki istekler için taze veriler alınır.

## Çözüm ve Tasarım Kararları

### 1. **Katmanlı Mimari**
Uygulama, modüler, ölçeklenebilir ve kolay bakım yapılabilir olması için katmanlı mimari ile geliştirilmiştir. Farklı katmanlar şunları içerir:

- **Controller Katmanı**: HTTP isteklerini ve yanıtlarını yönetir. Gelen istekleri işler ve hizmet katmanına iletir.
- **Service Katmanı**: İş mantığını içerir. Bu katman OMDb API ile etkileşime geçer ve önbellek mantığını yönetir.
- **Cache Katmanı**: Sunucu tarafı önbellekleme işlemlerini yönetir. `node-cache` kullanılarak arama sonuçları saklanır ve performans artırılır.
- **Config Katmanı**: Ortam değişkenlerini (API anahtarları, önbellek ayarları vb.) içerir.

Bu yapı, sorumlulukları ayırır, kod tabanını daha organize ve yönetilebilir hale getirir ve bireysel bileşenlerin kolayca güncellenmesine veya değiştirilmesine olanak tanır.

### 2. **Önbellekleme Mekanizması**
Dış API çağrılarının sayısını azaltmak ve uygulamanın performansını artırmak amacıyla, arama sonuçları süresiz olarak önbelleğe alınır. Ayrıca, 30 saniye içinde yinelenen aramalar için HTTP önbellekleme kullanılarak OMDb API'ye gereksiz istekler gönderilmez.

- **node-cache** kullanılarak sunucu tarafında arama sonuçları saklanır.
- Yinelenen istekler için önbellekten anında sonuçlar döndürülür ve gereksiz API çağrılarından kaçınılır.

### 3. **Verimli OMDb API Kullanımı**
OMDb API her istekte yalnızca 10 sonuç döndürdüğünden, `/api/search` uç noktası, ilk 20 sonucu toplamak için iki paralel API isteği yapar. Bu yaklaşım, bekleme süresini en aza indirir ve kullanıcılara daha hızlı yanıt verir.

## Başlangıç

### Gereksinimler

Sisteminizde aşağıdaki yazılımların kurulu olduğundan emin olun:

- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/)

### Kurulum

1. Depoyu klonlayın:

```bash
git clone https://github.com/your-repo/omdb-backend.git
cd omdb-backend
```
2. Docker dosyasının oluşturulması


```bash
version: '3'
services:
  backend:
    build: ./backend
    ports:
      - '5000:5000'
  frontend:
    build: ./frontend
    ports:
      - '3000:3000'
    environment:
      - CHOKIDAR_USEPOLLING=true

```

3. Docker dosyasını oluşturduktan sonra, Docker Compose ile uygulama ayağa kaldırma
```bash
docker-compose up --build
```
