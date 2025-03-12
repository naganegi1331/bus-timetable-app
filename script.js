// DOM要素の取得
const currentDateElement = document.getElementById('current-date');
const currentTimeElement = document.getElementById('current-time');
const refreshButton = document.getElementById('refresh-btn');
const routesContainer = document.getElementById('routes-container');

// 曜日の配列（日本語）
const weekdays = ['日', '月', '火', '水', '木', '金', '土'];

// 現在時刻と日付を更新する関数
function updateDateTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const date = now.getDate();
    const day = weekdays[now.getDay()];
    
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    currentDateElement.textContent = `${year}年${month}月${date}日（${day}）`;
    currentTimeElement.textContent = `${hours}:${minutes}:${seconds}`;
    
    return now;
}

// 曜日タイプを取得する関数（平日、土曜、日曜・祝日）
function getDayType(date) {
    const day = date.getDay();
    if (day === 0) return 'sunday';
    if (day === 6) return 'saturday';
    return 'weekday';
}

// 時間文字列を分に変換する関数
function timeToMinutes(timeStr) {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
}

// 現在時刻を分に変換する関数
function getCurrentTimeInMinutes(date) {
    return date.getHours() * 60 + date.getMinutes();
}

// 次のバス発車時刻を取得する関数
function getNextDeparture(schedule, currentTimeInMinutes) {
    // 時刻表の時間を分に変換
    const schedulesInMinutes = schedule.map(timeToMinutes);
    
    // 現在時刻以降の発車時刻を探す
    for (const departureTime of schedulesInMinutes) {
        if (departureTime >= currentTimeInMinutes) {
            return {
                time: schedule[schedulesInMinutes.indexOf(departureTime)],
                minutesLeft: departureTime - currentTimeInMinutes
            };
        }
    }
    
    // 今日の運行が終了している場合
    return null;
}

// 分数に基づいてCSSクラスを返す関数
function getMinutesLeftClass(minutesLeft) {
    if (minutesLeft <= 5) return 'soon';
    if (minutesLeft <= 15) return 'upcoming';
    return 'later';
}

// バス路線カードを生成する関数
function createRouteCard(route, dayType, currentTimeInMinutes) {
    const schedule = route.schedules[dayType];
    const nextDeparture = getNextDeparture(schedule, currentTimeInMinutes);
    
    const card = document.createElement('div');
    card.className = 'route-card';
    
    const header = document.createElement('div');
    header.className = 'route-header';
    
    const routeName = document.createElement('div');
    routeName.className = 'route-name';
    routeName.textContent = route.name;
    
    const routeDescription = document.createElement('div');
    routeDescription.className = 'route-description';
    routeDescription.textContent = route.description;
    
    header.appendChild(routeName);
    header.appendChild(routeDescription);
    card.appendChild(header);
    
    if (nextDeparture) {
        const nextDepartureDiv = document.createElement('div');
        nextDepartureDiv.className = 'next-departure';
        
        const departureTime = document.createElement('div');
        departureTime.className = 'departure-time';
        departureTime.textContent = nextDeparture.time;
        
        const minutesLeft = document.createElement('div');
        minutesLeft.className = `minutes-left ${getMinutesLeftClass(nextDeparture.minutesLeft)}`;
        minutesLeft.textContent = `あと${nextDeparture.minutesLeft}分`;
        
        nextDepartureDiv.appendChild(departureTime);
        nextDepartureDiv.appendChild(minutesLeft);
        card.appendChild(nextDepartureDiv);
    } else {
        const noMoreBuses = document.createElement('div');
        noMoreBuses.className = 'no-more-buses';
        noMoreBuses.textContent = '本日の運行は終了しました';
        card.appendChild(noMoreBuses);
    }
    
    return card;
}

// バス路線情報を表示する関数
function displayRoutes() {
    // 現在の日時を取得
    const now = updateDateTime();
    const currentTimeInMinutes = getCurrentTimeInMinutes(now);
    const dayType = getDayType(now);
    
    // 路線コンテナをクリア
    routesContainer.innerHTML = '';
    
    // 各路線のカードを生成して追加
    busRoutes.forEach(route => {
        const card = createRouteCard(route, dayType, currentTimeInMinutes);
        routesContainer.appendChild(card);
    });
}

// 初期表示
displayRoutes();

// 1秒ごとに時刻を更新
setInterval(() => {
    updateDateTime();
}, 1000);

// 30秒ごとに路線情報を更新（分が変わる可能性があるため）
setInterval(() => {
    displayRoutes();
}, 30000);

// 更新ボタンのイベントリスナー
refreshButton.addEventListener('click', () => {
    displayRoutes();
});

// CSVからデータを読み込む機能の実装例
/*
async function loadDataFromCSV(url) {
    try {
        const response = await fetch(url);
        const csvData = await response.text();
        
        // CSVデータをパースして時刻表データに変換
        const parsedRoutes = loadFromCSV(csvData);
        
        // グローバル変数を更新
        busRoutes = parsedRoutes;
        
        // 表示を更新
        displayRoutes();
    } catch (error) {
        console.error('CSVデータの読み込みに失敗しました:', error);
    }
}

// 使用例: loadDataFromCSV('timetable.csv');
*/
