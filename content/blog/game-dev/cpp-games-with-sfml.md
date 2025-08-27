---
title: '🎮 十六个经典C++游戏项目：技术废柴的游戏开发实战'
description: '从贪吃蛇到俄罗斯方块，从飞机大战到迷宫探索，分享我在SFML游戏开发中的完整项目经验和实用技巧，记录技术废柴在游戏开发领域的成长轨迹。'
date: '2020-06-30'
readTime: '15分钟'
tags: ['游戏开发', 'C++', 'SFML', '图形编程', '游戏引擎', '技术废柴', '项目实战', '跨界探索']
category: '游戏开发'
slug: 'cpp-games-with-sfml'
featured: false
author: 'LJoson'
status: 'published'
---

# 十六个经典C++游戏项目：技术废柴的游戏开发实战

> 从"Hello World"到完整游戏，我的SFML游戏开发项目集

## 我与游戏开发的"第一次亲密接触"

### 第一个游戏：贪吃蛇的"翻车"经历

还记得第一次用SFML写贪吃蛇时，我信心满满地开始编码：

```cpp
// 我的第一个"杰作"
class Snake {
    std::vector<sf::Vector2f> body;
    sf::Vector2f direction;

public:
    void move() {
        // 移动蛇身
        for (int i = body.size() - 1; i > 0; i--) {
            body[i] = body[i-1];  // 经典的"翻车"代码
        }
        body[0] += direction;
    }
};
```

结果呢？蛇头移动了，但蛇身没有跟上，整个蛇就像"断头蛇"一样。导师看到后直接笑出了声："你这是在做'贪吃虫'吗？"

### 第二次尝试：俄罗斯方块的"几何噩梦"

好不容易搞定了贪吃蛇，我又开始挑战俄罗斯方块：

```cpp
// 我的"几何学噩梦"
class Tetris {
    std::vector<std::vector<int>> board;

public:
    bool isValidMove(const Piece& piece, int x, int y) {
        // 复杂的碰撞检测逻辑
        // 结果：方块可以穿墙而过
        return true;  // 永远返回true，方块无敌了！
    }
};
```

这次更惨，方块可以穿墙、重叠、甚至"飞天"。我的俄罗斯方块变成了"俄罗斯魔法方块"。

### 觉醒时刻：游戏开发不是写代码，是创造世界

经过无数次的"翻车"经历，我终于明白：游戏开发不仅仅是写代码，更是创造一个完整的世界。每一个细节都需要精心设计，每一个机制都需要反复测试。

## 经典游戏项目实现

### 1. 贪吃蛇：从"断头蛇"到完美实现

#### 核心数据结构

```cpp
class Snake {
private:
    std::vector<sf::Vector2f> body;
    sf::Vector2f direction;
    float moveTimer;
    float moveInterval;
    bool growing;

public:
    Snake() : direction(1, 0), moveTimer(0), moveInterval(0.2f), growing(false) {
        // 初始化蛇身
        body.push_back(sf::Vector2f(400, 300)); // 头部
        body.push_back(sf::Vector2f(380, 300)); // 身体
        body.push_back(sf::Vector2f(360, 300)); // 尾部
    }

    void update(float deltaTime) {
        moveTimer += deltaTime;

        if (moveTimer >= moveInterval) {
            move();
            moveTimer = 0;
        }
    }

    void move() {
        // 保存头部位置
        sf::Vector2f newHead = body[0] + direction * 20.0f;

        // 移动身体（从尾部开始，避免覆盖）
        for (int i = body.size() - 1; i > 0; --i) {
            body[i] = body[i - 1];
        }

        // 设置新的头部位置
        body[0] = newHead;

        // 如果不需要生长，移除尾部
        if (!growing) {
            body.pop_back();
        } else {
            growing = false;
        }
    }

    void grow() {
        growing = true;
    }

    void setDirection(const sf::Vector2f& newDirection) {
        // 防止反向移动
        if (direction != -newDirection) {
            direction = newDirection;
        }
    }

    bool checkCollision() {
        // 检查是否撞墙
        if (body[0].x < 0 || body[0].x >= 800 ||
            body[0].y < 0 || body[0].y >= 600) {
            return true;
        }

        // 检查是否撞到自己
        for (size_t i = 1; i < body.size(); ++i) {
            if (body[0] == body[i]) {
                return true;
            }
        }

        return false;
    }

    const std::vector<sf::Vector2f>& getBody() const {
        return body;
    }

    sf::Vector2f getHead() const {
        return body[0];
    }
};
```

#### 游戏逻辑实现

```cpp
class SnakeGame : public GameState {
private:
    Snake snake;
    sf::Vector2f food;
    sf::Font font;
    sf::Text scoreText;
    int score;
    bool gameOver;

public:
    SnakeGame() : score(0), gameOver(false) {
        if (!font.loadFromFile("assets/fonts/arial.ttf")) {
            throw std::runtime_error("Failed to load font");
        }

        scoreText.setFont(font);
        scoreText.setCharacterSize(24);
        scoreText.setPosition(10, 10);
        scoreText.setString("Score: 0");

        spawnFood();
    }

    void handleEvent(const sf::Event& event) override {
        if (event.type == sf::Event::KeyPressed && !gameOver) {
            switch (event.key.code) {
                case sf::Keyboard::Up:
                    snake.setDirection(sf::Vector2f(0, -1));
                    break;
                case sf::Keyboard::Down:
                    snake.setDirection(sf::Vector2f(0, 1));
                    break;
                case sf::Keyboard::Left:
                    snake.setDirection(sf::Vector2f(-1, 0));
                    break;
                case sf::Keyboard::Right:
                    snake.setDirection(sf::Vector2f(1, 0));
                    break;
            }
        }

        if (event.type == sf::Event::KeyPressed && gameOver) {
            if (event.key.code == sf::Keyboard::R) {
                // 重新开始游戏
                reset();
            }
        }
    }

    void update(float deltaTime) override {
        if (!gameOver) {
            snake.update(deltaTime);

            // 检查是否吃到食物
            if (snake.getHead() == food) {
                snake.grow();
                score += 10;
                scoreText.setString("Score: " + std::to_string(score));
                spawnFood();
            }

            // 检查游戏结束条件
            if (snake.checkCollision()) {
                gameOver = true;
            }
        }
    }

    void render(sf::RenderWindow& window) override {
        // 绘制蛇身
        for (const auto& segment : snake.getBody()) {
            sf::RectangleShape rect(sf::Vector2f(18, 18));
            rect.setPosition(segment);
            rect.setFillColor(sf::Color::Green);
            rect.setOutlineColor(sf::Color::DarkGreen);
            rect.setOutlineThickness(1);
            window.draw(rect);
        }

        // 绘制食物
        sf::CircleShape foodShape(8);
        foodShape.setPosition(food);
        foodShape.setFillColor(sf::Color::Red);
        window.draw(foodShape);

        // 绘制分数
        window.draw(scoreText);

        // 绘制游戏结束信息
        if (gameOver) {
            sf::Text gameOverText;
            gameOverText.setFont(font);
            gameOverText.setString("Game Over! Press R to restart");
            gameOverText.setCharacterSize(32);
            gameOverText.setPosition(200, 250);
            gameOverText.setColor(sf::Color::Red);
            window.draw(gameOverText);
        }
    }

    void onEnter() override {
        reset();
    }

    void onExit() override {
        // 清理资源
    }

private:
    void spawnFood() {
        // 随机生成食物位置
        std::random_device rd;
        std::mt19937 gen(rd());
        std::uniform_int_distribution<> disX(0, 39);
        std::uniform_int_distribution<> disY(0, 29);

        food = sf::Vector2f(disX(gen) * 20, disY(gen) * 20);
    }

    void reset() {
        snake = Snake();
        score = 0;
        scoreText.setString("Score: 0");
        gameOver = false;
        spawnFood();
    }
};
```

### 2. 俄罗斯方块：几何学的完美应用

#### 方块形状定义

```cpp
// 方块形状定义
const std::vector<std::vector<std::vector<int>>> TETROMINOES = {
    // I形
    {
        {0,0,0,0},
        {1,1,1,1},
        {0,0,0,0},
        {0,0,0,0}
    },
    // O形
    {
        {1,1},
        {1,1}
    },
    // T形
    {
        {0,1,0},
        {1,1,1},
        {0,0,0}
    },
    // S形
    {
        {0,1,1},
        {1,1,0},
        {0,0,0}
    },
    // Z形
    {
        {1,1,0},
        {0,1,1},
        {0,0,0}
    },
    // J形
    {
        {1,0,0},
        {1,1,1},
        {0,0,0}
    },
    // L形
    {
        {0,0,1},
        {1,1,1},
        {0,0,0}
    }
};

class Tetromino {
private:
    std::vector<std::vector<int>> shape;
    sf::Vector2i position;
    sf::Color color;

public:
    Tetromino(int type) {
        shape = TETROMINOES[type];
        position = sf::Vector2i(3, 0);

        // 设置颜色
        std::vector<sf::Color> colors = {
            sf::Color::Cyan,    // I
            sf::Color::Yellow,  // O
            sf::Color::Magenta, // T
            sf::Color::Green,   // S
            sf::Color::Red,     // Z
            sf::Color::Blue,    // J
            sf::Color(255, 165, 0) // L (橙色)
        };
        color = colors[type];
    }

    void rotate() {
        // 矩阵旋转90度
        std::vector<std::vector<int>> rotated(shape[0].size(),
                                             std::vector<int>(shape.size()));

        for (size_t i = 0; i < shape.size(); ++i) {
            for (size_t j = 0; j < shape[0].size(); ++j) {
                rotated[j][shape.size() - 1 - i] = shape[i][j];
            }
        }
        shape = rotated;
    }

    void move(const sf::Vector2i& offset) {
        position += offset;
    }

    bool isValidPosition(const std::vector<std::vector<int>>& board) const {
        for (size_t i = 0; i < shape.size(); ++i) {
            for (size_t j = 0; j < shape[i].size(); ++j) {
                if (shape[i][j] == 0) continue;

                int boardX = position.x + j;
                int boardY = position.y + i;

                // 检查边界
                if (boardX < 0 || boardX >= board[0].size() ||
                    boardY >= board.size()) {
                    return false;
                }

                // 检查碰撞
                if (boardY >= 0 && board[boardY][boardX] != 0) {
                    return false;
                }
            }
        }
        return true;
    }

    void placeOnBoard(std::vector<std::vector<int>>& board) const {
        for (size_t i = 0; i < shape.size(); ++i) {
            for (size_t j = 0; j < shape[i].size(); ++j) {
                if (shape[i][j] != 0) {
                    int boardX = position.x + j;
                    int boardY = position.y + i;
                    if (boardY >= 0) {
                        board[boardY][boardX] = 1;
                    }
                }
            }
        }
    }

    const std::vector<std::vector<int>>& getShape() const { return shape; }
    sf::Vector2i getPosition() const { return position; }
    sf::Color getColor() const { return color; }
};
```
            currentPiece = rotated;
        }
    }

    void movePiece(int dx, int dy) {
        sf::Vector2i newPos = piecePos + sf::Vector2i(dx, dy);
        if (canPlace(currentPiece, newPos)) {
            piecePos = newPos;
        }
    }

    void dropPiece() {
        while (canPlace(currentPiece, piecePos + sf::Vector2i(0, 1))) {
            piecePos.y++;
        }
        placePiece();
        clearLines();
        spawnNewPiece();
    }
};
```

### 3. 弹球游戏 (Pong)

#### 游戏特点
- **双人对战**：支持两个玩家对战
- **物理模拟**：球的反弹和速度变化
- **AI对手**：可选的AI对手

#### 核心代码
```cpp
class Pong {
private:
    sf::RectangleShape leftPaddle, rightPaddle;
    sf::CircleShape ball;
    sf::Vector2f ballVelocity;
    int leftScore, rightScore;

public:
    void update() {
        // 更新球的位置
        ball.move(ballVelocity);

        // 检查边界碰撞
        if (ball.getPosition().y <= 0 ||
            ball.getPosition().y >= HEIGHT - ball.getRadius()) {
            ballVelocity.y = -ballVelocity.y;
        }

        // 检查球拍碰撞
        if (ball.getGlobalBounds().intersects(leftPaddle.getGlobalBounds()) ||
            ball.getGlobalBounds().intersects(rightPaddle.getGlobalBounds())) {
            ballVelocity.x = -ballVelocity.x;
            // 增加球的速度
            ballVelocity *= 1.1f;
        }

        // 检查得分
        if (ball.getPosition().x <= 0) {
            rightScore++;
            resetBall();
        } else if (ball.getPosition().x >= WIDTH) {
            leftScore++;
            resetBall();
        }
    }

    void movePaddle(int player, float dy) {
        if (player == 0) {
            leftPaddle.move(0, dy);
        } else {
            rightPaddle.move(0, dy);
        }

        // 限制球拍在屏幕内
        if (leftPaddle.getPosition().y < 0) {
            leftPaddle.setPosition(leftPaddle.getPosition().x, 0);
        }
        if (leftPaddle.getPosition().y > HEIGHT - leftPaddle.getSize().y) {
            leftPaddle.setPosition(leftPaddle.getPosition().x,
                                 HEIGHT - leftPaddle.getSize().y);
        }
    }
};
```

### 4. 飞机大战 (Space Shooter)

#### 游戏特点
- **敌机生成**：随机生成敌机
- **子弹系统**：发射子弹击毁敌机
- **爆炸效果**：敌机被击毁时的爆炸动画

#### 核心代码
```cpp
class SpaceShooter {
private:
    sf::RectangleShape player;
    std::vector<sf::RectangleShape> enemies;
    std::vector<sf::RectangleShape> bullets;
    int score;

public:
    void update() {
        // 更新子弹位置
        for (auto& bullet : bullets) {
            bullet.move(0, -5);
        }

        // 更新敌机位置
        for (auto& enemy : enemies) {
            enemy.move(0, 2);
        }

        // 检查碰撞
        checkCollisions();

        // 清理超出屏幕的对象
        cleanupObjects();

        // 生成新敌机
        if (rand() % 100 < 5) {
            spawnEnemy();
        }
    }

    void shoot() {
        sf::RectangleShape bullet(sf::Vector2f(2, 10));
        bullet.setPosition(player.getPosition().x +
                          player.getSize().x / 2 - 1,
                          player.getPosition().y);
        bullets.push_back(bullet);
    }

    void checkCollisions() {
        // 检查子弹和敌机的碰撞
        for (auto bulletIt = bullets.begin();
             bulletIt != bullets.end(); ++bulletIt) {
            for (auto enemyIt = enemies.begin();
                 enemyIt != enemies.end(); ++enemyIt) {
                if (bulletIt->getGlobalBounds().intersects(
                    enemyIt->getGlobalBounds())) {
                    bullets.erase(bulletIt);
                    enemies.erase(enemyIt);
                    score += 10;
                    break;
                }
            }
        }
    }
};
```

### 5. 迷宫游戏 (Maze)

#### 游戏特点
- **迷宫生成**：使用算法生成随机迷宫
- **路径寻找**：实现A*算法寻找最短路径
- **玩家控制**：键盘控制玩家移动

#### 核心代码
```cpp
class Maze {
private:
    std::vector<std::vector<int>> maze;
    sf::Vector2i playerPos;
    sf::Vector2i goalPos;

public:
    void generateMaze() {
        // 使用深度优先搜索生成迷宫
        std::vector<std::vector<bool>> visited(HEIGHT,
                                              std::vector<bool>(WIDTH, false));

        std::stack<sf::Vector2i> stack;
        stack.push(sf::Vector2i(1, 1));
        visited[1][1] = true;

        while (!stack.empty()) {
            sf::Vector2i current = stack.top();
            std::vector<sf::Vector2i> neighbors = getUnvisitedNeighbors(current, visited);

            if (neighbors.empty()) {
                stack.pop();
            } else {
                sf::Vector2i next = neighbors[rand() % neighbors.size()];
                removeWall(current, next);
                visited[next.y][next.x] = true;
                stack.push(next);
            }
        }
    }

    bool movePlayer(int dx, int dy) {
        sf::Vector2i newPos = playerPos + sf::Vector2i(dx, dy);

        if (newPos.x >= 0 && newPos.x < WIDTH &&
            newPos.y >= 0 && newPos.y < HEIGHT &&
            maze[newPos.y][newPos.x] == 0) {
            playerPos = newPos;
            return true;
        }
        return false;
    }

    bool isGoalReached() {
        return playerPos == goalPos;
    }
};
```

## 游戏开发技巧

### 1. 游戏循环设计
```cpp
class GameLoop {
private:
    sf::Clock clock;
    float deltaTime;

public:
    void run() {
        while (window.isOpen()) {
            // 处理事件
            handleEvents();

            // 更新游戏状态
            update(deltaTime);

            // 渲染画面
            render();

            // 控制帧率
            deltaTime = clock.restart().asSeconds();
            if (deltaTime < 1.0f / 60.0f) {
                sf::sleep(sf::seconds(1.0f / 60.0f - deltaTime));
            }
        }
    }

    void handleEvents() {
        sf::Event event;
        while (window.pollEvent(event)) {
            if (event.type == sf::Event::Closed) {
                window.close();
            }
            // 处理其他事件
        }
    }
};
```

### 2. 状态管理
```cpp
enum class GameState {
    MENU,
    PLAYING,
    PAUSED,
    GAME_OVER
};

class GameStateManager {
private:
    GameState currentState;

public:
    void update() {
        switch (currentState) {
            case GameState::MENU:
                updateMenu();
                break;
            case GameState::PLAYING:
                updateGame();
                break;
            case GameState::PAUSED:
                updatePause();
                break;
            case GameState::GAME_OVER:
                updateGameOver();
                break;
        }
    }

    void changeState(GameState newState) {
        currentState = newState;
    }
};
```

### 3. 资源管理
```cpp
class ResourceManager {
private:
    std::map<std::string, sf::Texture> textures;
    std::map<std::string, sf::Font> fonts;
    std::map<std::string, sf::SoundBuffer> sounds;

public:
    sf::Texture& getTexture(const std::string& name) {
        if (textures.find(name) == textures.end()) {
            textures[name].loadFromFile("assets/textures/" + name + ".png");
        }
        return textures[name];
    }

    sf::Font& getFont(const std::string& name) {
        if (fonts.find(name) == fonts.end()) {
            fonts[name].loadFromFile("assets/fonts/" + name + ".ttf");
        }
        return fonts[name];
    }
};
```

## 踩坑经验分享

### 1. 环境配置坑
```cpp
// 问题：SFML库链接失败
// 错误信息：LNK2019 unresolved external symbol
// 解决方案：
// 1. 检查库文件路径是否正确
// 2. 确认Debug/Release版本匹配
// 3. 检查依赖项是否完整

// 问题：DLL文件找不到
// 错误信息：The program can't start because xxx.dll is missing
// 解决方案：
// 1. 将SFML的bin目录添加到系统PATH
// 2. 或者将DLL文件复制到可执行文件目录
```

### 2. 游戏逻辑坑
```cpp
// 问题：游戏循环卡顿
// 错误做法：没有控制帧率
// 正确做法：使用sf::Clock控制帧率

// 问题：碰撞检测不准确
// 错误做法：使用简单的矩形碰撞
// 正确做法：根据游戏需求选择合适的碰撞检测算法

// 问题：内存泄漏
// 错误做法：频繁创建删除对象
// 正确做法：使用对象池或智能指针
```

### 3. 性能优化坑
```cpp
// 问题：渲染性能差
// 错误做法：每帧重新创建图形对象
// 正确做法：预创建对象，只更新位置

// 问题：音效播放卡顿
// 错误做法：同时播放太多音效
// 正确做法：限制同时播放的音效数量

// 问题：游戏卡顿
// 错误做法：在渲染循环中进行复杂计算
// 正确做法：将计算分散到多个帧中
```

## 项目总结

### 1. 技术收获
- **图形编程**：掌握了SFML的基本用法
- **游戏设计**：学会了游戏循环和状态管理
- **物理模拟**：理解了基本的物理概念
- **音效处理**：学会了音频播放和管理

### 2. 开发经验
- **模块化设计**：将游戏分解为多个模块
- **代码复用**：提取公共功能为基类
- **调试技巧**：使用调试工具定位问题
- **性能优化**：优化关键路径的性能

### 3. 学习建议
- **从简单开始**：先实现简单的游戏，再逐步增加复杂度
- **多看源码**：学习优秀的开源游戏项目
- **实践为主**：理论结合实践，多写代码
- **持续学习**：关注游戏开发的新技术和趋势

## 参考资料

### 官方文档
- [SFML官方文档](https://www.sfml-dev.org/documentation.php)
- [SFML教程](https://www.sfml-dev.org/tutorials.php)
- [SFML示例](https://github.com/SFML/SFML/tree/master/examples)

### 学习资源
- [游戏开发教程](https://www.gamefromscratch.com/)
- [C++游戏编程](https://www.learncpp.com/)
- [OpenGL教程](https://learnopengl.com/)

---

**写在最后**：游戏开发是一个充满挑战和乐趣的领域，需要扎实的编程基础和丰富的想象力。作为一个技术废柴，我深深体会到实践和坚持的重要性。记住，每一个游戏大神都是从简单的"Hello World"开始的！

> 💡 **废柴小贴士**：当你开始游戏开发时，不要害怕从简单的项目开始，每一个经典游戏都有其独特的魅力。每一个技术废柴都有成为游戏开发者的潜力。
