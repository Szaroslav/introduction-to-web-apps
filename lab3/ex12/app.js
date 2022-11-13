onload = async () => {
    const ACCURATE_CLICK_POINTS = 12;
    const INACCURATE_CLICK_POINTS = -6;
    const MAX_HEALTH = 3;
    const MOB_SIZE = {x: 200, y: 312};
    const HIGH_SCORES_SIZE = 7;
    const DB_URL = 'https://jsonblob.com/api/jsonBlob/1041360271880503296';

    const game = document.querySelector('.game');
    const gameOverUI = document.querySelector('.game-ui-over');
    const highScoresUI = document.querySelector('.game-ui-high-scores');
    const healthUI = document.querySelector('.game-ui-health')
    const scoreUI = document.querySelector('.game-ui-score');
    const nicknameUI = document.querySelector('.game-ui-nickname');
    const nicknameFormUI = document.querySelector('.game-ui-nickname-form');

    let gameData = await fetch(DB_URL).then(res => res.json());
    let score = 0;
    let health = MAX_HEALTH;
    let isGameOver = false;
    let gameId = 0;
    let nickname = '';

    const randRange = (from, to) => Math.floor(Math.random() * (to - from + 1) + from);

    const createElement = (tag, className = '', text = '', children = []) => {
        const el = document.createElement(tag);
        el.className = className;
        el.textContent = text;
        children.forEach(child => el.append(child));

        return el;
    };

    const restart = () => {
        setHealth(MAX_HEALTH);
        setScore(0);
        gameOverUI.classList.remove('active');
        game.querySelectorAll('.game-mob').forEach(mob => mob.remove());

        gameId = setInterval(spawnMob, randRange(800, 1200));
        isGameOver = false;
    };

    const addScore = async (name, score) => {
        gameData = await fetch(DB_URL).then(res => res.json());
        gameData.highScores.push({playerName: name, score: score, date: Date.now()});
        gameData.highScores.sort((a, b) => b.score - a.score);
        gameData.highScores.length > HIGH_SCORES_SIZE && gameData.highScores.pop();

        fetch(DB_URL, {
            method: 'PUT',
            body: JSON.stringify(gameData),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };

    const handleGameOver = () => {
        isGameOver = true;
        clearInterval(gameId);
        addScore(nickname, score).then(() => {
            renderHighScores();
            gameOverUI.classList.add('active');
        });
    };

    const setScore = x => {
        score = x;
        score = Math.max(score, 0);
        scoreUI.innerText = '0'.repeat(Math.max(scoreUI.innerText.length - score.toString().length, 0)) + score.toString();
    };

    const setHealth = x => {
        health = Math.max(x, 0);

        healthUI.innerHTML = '';
        for (let i = 0; i < health; i++)
            healthUI.append(createElement('i', 'game-icon-heart fa-solid fa-heart'));
        for (let i = 0; i < MAX_HEALTH - health; i++)
            healthUI.append(createElement('i', 'game-icon-heart lost fa-solid fa-heart-crack'));

        if (health <= 0)
            handleGameOver();
    };

    const handleGameClick = () => {
        if (!isGameOver)
            setScore(score + INACCURATE_CLICK_POINTS);
    };

    const handleNicknameSubmit = e => {
        e.preventDefault();

        nickname = nicknameFormUI.gameNickname.value.trim();;
        nicknameUI.textContent = nickname;
        nicknameFormUI.parentElement.classList.remove('active');
        start();
    };

    const handleMobClick = (e, mob, id) => {
        e.stopPropagation();

        setScore(score + ACCURATE_CLICK_POINTS);
        mob.remove();
        clearInterval(id);
    };

    const spawnMob = () => {
        const initSize = factor => {
            mob.style.width = MOB_SIZE.x * factor + 'px';
            mob.style.height = MOB_SIZE.y * factor + 'px';
        };

        const initPosition = y => {
            mob.style.bottom = y + 'px';
            mob.style.right = '-200px';
            mob.style.zIndex = 100 - y;
        };

        const initMovement = () => {
            const delay = randRange(1, 15);
            const deltaX = delay <= 10 ? 4 : 2;
            const intervalId = setInterval(() => {
                const x = parseInt(mob.style.right) + deltaX;
                mob.style.right = x + 'px'
    
                if (x > game.offsetWidth) {
                    clearInterval(intervalId);
                    mob.remove();
                    setHealth(health - 1);
                }
                if (isGameOver) {
                    clearInterval(intervalId);
                    mob.classList.add('idle');
                }
            }, delay);

            return intervalId;
        };

        const mob = createElement('div', 'game-mob');
        game.append(mob);

        initSize(randRange(80, 100) / 100);
        initPosition(randRange(-80, 100));
        const id = initMovement();

        mob.addEventListener('click', e => handleMobClick(e, mob, id));
    };

    const renderHighScores = () => {
        highScoresUI.innerHTML = '<li class="game-ui-high-scores-title game-ui-high-scores-item">Leaderboard</li>';

        gameData.highScores.forEach((highScore, i) => {
            highScoresUI.append(createElement('li', 'game-ui-high-scores-item', '', [
                createElement('p', 'game-ui-high-scores-place', i + 1),
                createElement('p', 'game-ui-high-scores-player-name', highScore.playerName),
                createElement('p', 'game-ui-high-scores-score', highScore.score),
                createElement('p', 'game-ui-high-scores-player-date', new Date(highScore.date).toLocaleDateString()),
            ]));
        })
    };

    const start = () => {
        gameId = setInterval(spawnMob, randRange(800, 1200));
    };

    const init = () => {
        game.addEventListener('click', handleGameClick);
        gameOverUI.querySelector('.game-ui-over-button').addEventListener('click', restart);
        nicknameFormUI.addEventListener('submit', handleNicknameSubmit);
        setHealth(MAX_HEALTH);
    }

    init();
};