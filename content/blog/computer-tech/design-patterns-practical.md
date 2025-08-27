---
title: '🎨 设计模式实战：技术废柴的代码重构之旅'
description: '从混乱代码到优雅架构，分享我在设计模式学习过程中的实用技巧和实战经验，记录技术废柴在软件工程领域的成长轨迹。'
date: '2023-12-28'
readTime: '18分钟'
tags: ['设计模式', '编程技巧', '代码架构', '软件工程', '最佳实践', '跨界探索']
category: '计算机技术'
slug: 'design-patterns-practical'
featured: false
author: 'LJoson'
status: 'published'
---

# 设计模式实战：技术废柴的代码重构之旅

> 从"面条代码"到"优雅架构"，我的设计模式进化史

## 我与设计模式的"相爱相杀"

### 第一次"翻车"：面条代码的诞生

还记得第一次写游戏管理系统时，我信心满满地开始编码：

```csharp
// 我的第一个"杰作" - 面条代码
public class GameController : MonoBehaviour
{
    public int playerHealth = 100;
    public int playerScore = 0;
    public bool isGamePaused = false;
    public string currentLevel = "Level1";
    public float gameTime = 0f;

    // 玩家相关
    public void TakeDamage(int damage) {
        playerHealth -= damage;
        if (playerHealth <= 0) {
            GameOver();
        }
    }

    public void AddScore(int points) {
        playerScore += points;
        UpdateUI();
    }

    public void PauseGame() {
        isGamePaused = true;
        Time.timeScale = 0;
    }

    public void ResumeGame() {
        isGamePaused = false;
        Time.timeScale = 1;
    }

    // UI相关
    public void UpdateUI() {
        // 更新所有UI元素
        healthText.text = "Health: " + playerHealth;
        scoreText.text = "Score: " + playerScore;
        levelText.text = "Level: " + currentLevel;
        timeText.text = "Time: " + gameTime;
    }

    // 音频相关
    public void PlaySound(string soundName) {
        // 播放音效
    }

    // 场景相关
    public void LoadLevel(string levelName) {
        // 加载场景
    }

    // 数据相关
    public void SaveGame() {
        // 保存游戏数据
    }

    public void LoadGame() {
        // 加载游戏数据
    }

    // 网络相关
    public void SendScoreToServer() {
        // 发送分数到服务器
    }
}
```

结果呢？这个类越来越大，功能越来越混乱，维护起来痛苦不堪。导师看到后直接给我发了个"🤦‍♂️"的表情："你这是在做'面条代码'吗？"

### 第二次尝试：过度设计的"灾难"

好不容易学会了设计模式，我又开始"过度设计"：

```csharp
// 我的"过度设计"杰作
public interface IGameState {
    void Enter();
    void Exit();
    void Update();
}

public abstract class AbstractGameState : IGameState {
    protected GameStateMachine stateMachine;

    public virtual void Enter() {}
    public virtual void Exit() {}
    public virtual void Update() {}
}

public class PlayingState : AbstractGameState {
    public override void Enter() {
        // 进入游戏状态
    }
}

public class PausedState : AbstractGameState {
    public override void Enter() {
        // 进入暂停状态
    }
}

public class GameOverState : AbstractGameState {
    public override void Enter() {
        // 进入游戏结束状态
    }
}

public class GameStateMachine {
    private IGameState currentState;
    private Dictionary<Type, IGameState> states;

    public void ChangeState<T>() where T : IGameState {
        // 状态切换逻辑
    }
}

// 工厂模式
public interface IGameObjectFactory {
    GameObject CreateGameObject(string type);
}

public class GameObjectFactory : IGameObjectFactory {
    public GameObject CreateGameObject(string type) {
        // 创建游戏对象
    }
}

// 观察者模式
public interface IObserver {
    void OnNotify(string eventName, object data);
}

public class GameEventSystem {
    private Dictionary<string, List<IObserver>> observers;

    public void AddObserver(string eventName, IObserver observer) {
        // 添加观察者
    }

    public void Notify(string eventName, object data) {
        // 通知观察者
    }
}
```

这次更惨，为了一个简单的游戏管理系统，我写了十几个类和接口，代码复杂度直线上升。我的"优雅架构"变成了"过度设计"的灾难。

### 觉醒时刻：设计模式不是银弹，是工具

经过无数次的"翻车"经历，我终于明白：设计模式不是银弹，而是工具。关键是要在合适的地方使用合适的设计模式，而不是为了使用设计模式而使用设计模式。

## 实用设计模式：从问题到解决方案

### 1. 单例模式：全局管理器的救星

#### 问题场景：游戏管理器

**问题描述：**
- 需要全局访问游戏状态
- 避免创建多个实例
- 跨场景保持数据

**解决方案：**

```csharp
public class GameManager : MonoBehaviour
{
    // 私有静态实例
    private static GameManager _instance;

    // 公共访问点
    public static GameManager Instance
    {
        get
        {
            if (_instance == null)
            {
                _instance = FindObjectOfType<GameManager>();

                if (_instance == null)
                {
                    GameObject go = new GameObject("GameManager");
                    _instance = go.AddComponent<GameManager>();
                    DontDestroyOnLoad(go);
                }
            }
            return _instance;
        }
    }

    // 游戏数据
    public int PlayerHealth { get; private set; } = 100;
    public int PlayerScore { get; private set; } = 0;
    public bool IsGamePaused { get; private set; } = false;

    // 游戏方法
    public void TakeDamage(int damage)
    {
        PlayerHealth = Mathf.Max(0, PlayerHealth - damage);
        if (PlayerHealth <= 0)
        {
            GameOver();
        }
    }

    public void AddScore(int points)
    {
        PlayerScore += points;
    }

    public void PauseGame()
    {
        IsGamePaused = true;
        Time.timeScale = 0;
    }

    public void ResumeGame()
    {
        IsGamePaused = false;
        Time.timeScale = 1;
    }

    private void GameOver()
    {
        // 游戏结束逻辑
        Debug.Log("Game Over!");
    }
}

// 使用示例
public class PlayerController : MonoBehaviour
{
    void Update()
    {
        if (Input.GetKeyDown(KeyCode.Space))
        {
            GameManager.Instance.AddScore(10);
        }

        if (Input.GetKeyDown(KeyCode.P))
        {
            if (GameManager.Instance.IsGamePaused)
                GameManager.Instance.ResumeGame();
            else
                GameManager.Instance.PauseGame();
        }
    }
}
```

**使用场景：**
- 游戏管理器
- 音频管理器
- 配置管理器
- 网络管理器

### 2. 观察者模式：解耦事件系统

#### 问题场景：UI更新和游戏事件

**问题描述：**
- 游戏状态变化时需要更新多个UI
- 避免直接依赖
- 支持动态添加/移除监听者

**解决方案：**

```csharp
// 事件系统
public class GameEventSystem
{
    private static GameEventSystem _instance;
    public static GameEventSystem Instance
    {
        get
        {
            if (_instance == null)
                _instance = new GameEventSystem();
            return _instance;
        }
    }

    private Dictionary<string, List<Action<object>>> _events;

    private GameEventSystem()
    {
        _events = new Dictionary<string, List<Action<object>>>();
    }

    public void Subscribe(string eventName, Action<object> callback)
    {
        if (!_events.ContainsKey(eventName))
            _events[eventName] = new List<Action<object>>();

        _events[eventName].Add(callback);
    }

    public void Unsubscribe(string eventName, Action<object> callback)
    {
        if (_events.ContainsKey(eventName))
            _events[eventName].Remove(callback);
    }

    public void Publish(string eventName, object data = null)
    {
        if (_events.ContainsKey(eventName))
        {
            foreach (var callback in _events[eventName])
            {
                callback?.Invoke(data);
            }
        }
    }
}

// 使用示例
public class HealthUI : MonoBehaviour
{
    public Text healthText;

    void Start()
    {
        // 订阅健康值变化事件
        GameEventSystem.Instance.Subscribe("HealthChanged", OnHealthChanged);
    }

    void OnDestroy()
    {
        // 取消订阅
        GameEventSystem.Instance.Unsubscribe("HealthChanged", OnHealthChanged);
    }

    void OnHealthChanged(object data)
    {
        int health = (int)data;
        healthText.text = $"Health: {health}";
    }
}

public class ScoreUI : MonoBehaviour
{
    public Text scoreText;

    void Start()
    {
        // 订阅分数变化事件
        GameEventSystem.Instance.Subscribe("ScoreChanged", OnScoreChanged);
    }

    void OnDestroy()
    {
        GameEventSystem.Instance.Unsubscribe("ScoreChanged", OnScoreChanged);
    }

    void OnScoreChanged(object data)
    {
        int score = (int)data;
        scoreText.text = $"Score: {score}";
    }
}

// 在GameManager中发布事件
public class GameManager : MonoBehaviour
{
    public void TakeDamage(int damage)
    {
        PlayerHealth = Mathf.Max(0, PlayerHealth - damage);

        // 发布健康值变化事件
        GameEventSystem.Instance.Publish("HealthChanged", PlayerHealth);

        if (PlayerHealth <= 0)
        {
            GameEventSystem.Instance.Publish("GameOver");
        }
    }

    public void AddScore(int points)
    {
        PlayerScore += points;

        // 发布分数变化事件
        GameEventSystem.Instance.Publish("ScoreChanged", PlayerScore);
    }
}
```

**使用场景：**
- UI更新
- 游戏事件处理
- 成就系统
- 音频播放

### 3. 工厂模式：对象创建的优雅方式

#### 问题场景：游戏对象创建

**问题描述：**
- 需要创建不同类型的游戏对象
- 创建逻辑复杂
- 需要统一管理

**解决方案：**

```csharp
// 游戏对象基类
public abstract class GameObject
{
    public string Name { get; set; }
    public Vector3 Position { get; set; }

    public abstract void Initialize();
    public abstract void Update();
}

// 具体游戏对象
public class Player : GameObject
{
    public int Health { get; set; }
    public float Speed { get; set; }

    public override void Initialize()
    {
        Health = 100;
        Speed = 5f;
        Debug.Log($"Player {Name} initialized with {Health} health");
    }

    public override void Update()
    {
        // 玩家更新逻辑
    }
}

public class Enemy : GameObject
{
    public int Damage { get; set; }
    public float AttackRange { get; set; }

    public override void Initialize()
    {
        Damage = 10;
        AttackRange = 2f;
        Debug.Log($"Enemy {Name} initialized with {Damage} damage");
    }

    public override void Update()
    {
        // 敌人更新逻辑
    }
}

public class Item : GameObject
{
    public string ItemType { get; set; }
    public int Value { get; set; }

    public override void Initialize()
    {
        Value = 50;
        Debug.Log($"Item {Name} of type {ItemType} initialized");
    }

    public override void Update()
    {
        // 物品更新逻辑
    }
}

// 工厂类
public class GameObjectFactory
{
    public static GameObject CreateGameObject(string type, string name, Vector3 position)
    {
        GameObject gameObject = null;

        switch (type.ToLower())
        {
            case "player":
                gameObject = new Player();
                break;
            case "enemy":
                gameObject = new Enemy();
                break;
            case "item":
                gameObject = new Item();
                break;
            default:
                throw new ArgumentException($"Unknown game object type: {type}");
        }

        gameObject.Name = name;
        gameObject.Position = position;
        gameObject.Initialize();

        return gameObject;
    }
}

// 使用示例
public class GameController : MonoBehaviour
{
    void Start()
    {
        // 创建玩家
        var player = GameObjectFactory.CreateGameObject("player", "Hero", new Vector3(0, 0, 0));

        // 创建敌人
        var enemy = GameObjectFactory.CreateGameObject("enemy", "Goblin", new Vector3(5, 0, 0));

        // 创建物品
        var item = GameObjectFactory.CreateGameObject("item", "HealthPotion", new Vector3(2, 0, 0));
    }
}
```

**使用场景：**
- 游戏对象创建
- 武器系统
- 道具系统
- 敌人生成

### 4. 策略模式：算法的灵活切换

#### 问题场景：AI行为系统

**问题描述：**
- 敌人有不同的行为模式
- 需要动态切换行为
- 避免大量的if-else语句

**解决方案：**

```csharp
// 行为策略接口
public interface IAIBehavior
{
    void Execute(GameObject target);
}

// 具体行为策略
public class AggressiveBehavior : IAIBehavior
{
    public void Execute(GameObject target)
    {
        Debug.Log("Aggressive: Charging at target!");
        // 攻击行为逻辑
    }
}

public class DefensiveBehavior : IAIBehavior
{
    public void Execute(GameObject target)
    {
        Debug.Log("Defensive: Keeping distance from target!");
        // 防御行为逻辑
    }
}

public class StealthBehavior : IAIBehavior
{
    public void Execute(GameObject target)
    {
        Debug.Log("Stealth: Sneaking around target!");
        // 潜行行为逻辑
    }
}

public class PatrolBehavior : IAIBehavior
{
    public void Execute(GameObject target)
    {
        Debug.Log("Patrol: Patrolling the area!");
        // 巡逻行为逻辑
    }
}

// AI控制器
public class AIController
{
    private IAIBehavior currentBehavior;
    private GameObject target;

    public void SetBehavior(IAIBehavior behavior)
    {
        currentBehavior = behavior;
    }

    public void SetTarget(GameObject newTarget)
    {
        target = newTarget;
    }

    public void Update()
    {
        if (currentBehavior != null && target != null)
        {
            currentBehavior.Execute(target);
        }
    }
}

// 使用示例
public class EnemyAI : MonoBehaviour
{
    private AIController aiController;
    private GameObject player;

    void Start()
    {
        aiController = new AIController();
        player = GameObject.FindGameObjectWithTag("Player");
        aiController.SetTarget(player);

        // 根据敌人类型设置行为
        SetBehaviorByType();
    }

    void Update()
    {
        aiController.Update();
    }

    void SetBehaviorByType()
    {
        string enemyType = gameObject.tag;

        switch (enemyType)
        {
            case "AggressiveEnemy":
                aiController.SetBehavior(new AggressiveBehavior());
                break;
            case "DefensiveEnemy":
                aiController.SetBehavior(new DefensiveBehavior());
                break;
            case "StealthEnemy":
                aiController.SetBehavior(new StealthBehavior());
                break;
            case "PatrolEnemy":
                aiController.SetBehavior(new PatrolBehavior());
                break;
        }
    }

    // 动态切换行为
    public void SwitchToAggressive()
    {
        aiController.SetBehavior(new AggressiveBehavior());
    }

    public void SwitchToDefensive()
    {
        aiController.SetBehavior(new DefensiveBehavior());
    }
}
```

**使用场景：**
- AI行为系统
- 武器系统
- 支付系统
- 排序算法

### 5. 命令模式：操作的历史记录

#### 问题场景：撤销/重做系统

**问题描述：**
- 需要支持撤销/重做操作
- 操作可以组合
- 支持宏命令

**解决方案：**

```csharp
// 命令接口
public interface ICommand
{
    void Execute();
    void Undo();
}

// 具体命令
public class MoveCommand : ICommand
{
    private GameObject target;
    private Vector3 oldPosition;
    private Vector3 newPosition;

    public MoveCommand(GameObject target, Vector3 newPosition)
    {
        this.target = target;
        this.oldPosition = target.transform.position;
        this.newPosition = newPosition;
    }

    public void Execute()
    {
        target.transform.position = newPosition;
        Debug.Log($"Moved {target.name} to {newPosition}");
    }

    public void Undo()
    {
        target.transform.position = oldPosition;
        Debug.Log($"Undid move of {target.name} back to {oldPosition}");
    }
}

public class ScaleCommand : ICommand
{
    private GameObject target;
    private Vector3 oldScale;
    private Vector3 newScale;

    public ScaleCommand(GameObject target, Vector3 newScale)
    {
        this.target = target;
        this.oldScale = target.transform.localScale;
        this.newScale = newScale;
    }

    public void Execute()
    {
        target.transform.localScale = newScale;
        Debug.Log($"Scaled {target.name} to {newScale}");
    }

    public void Undo()
    {
        target.transform.localScale = oldScale;
        Debug.Log($"Undid scale of {target.name} back to {oldScale}");
    }
}

// 宏命令
public class MacroCommand : ICommand
{
    private List<ICommand> commands;

    public MacroCommand()
    {
        commands = new List<ICommand>();
    }

    public void AddCommand(ICommand command)
    {
        commands.Add(command);
    }

    public void Execute()
    {
        foreach (var command in commands)
        {
            command.Execute();
        }
    }

    public void Undo()
    {
        // 反向执行命令
        for (int i = commands.Count - 1; i >= 0; i--)
        {
            commands[i].Undo();
        }
    }
}

// 命令管理器
public class CommandManager
{
    private Stack<ICommand> undoStack;
    private Stack<ICommand> redoStack;

    public CommandManager()
    {
        undoStack = new Stack<ICommand>();
        redoStack = new Stack<ICommand>();
    }

    public void ExecuteCommand(ICommand command)
    {
        command.Execute();
        undoStack.Push(command);
        redoStack.Clear(); // 新命令会清空重做栈
    }

    public void Undo()
    {
        if (undoStack.Count > 0)
        {
            ICommand command = undoStack.Pop();
            command.Undo();
            redoStack.Push(command);
        }
    }

    public void Redo()
    {
        if (redoStack.Count > 0)
        {
            ICommand command = redoStack.Pop();
            command.Execute();
            undoStack.Push(command);
        }
    }
}

// 使用示例
public class GameEditor : MonoBehaviour
{
    private CommandManager commandManager;
    private GameObject selectedObject;

    void Start()
    {
        commandManager = new CommandManager();
    }

    void Update()
    {
        // 移动命令
        if (Input.GetKeyDown(KeyCode.W))
        {
            if (selectedObject != null)
            {
                Vector3 newPosition = selectedObject.transform.position + Vector3.forward;
                ICommand moveCommand = new MoveCommand(selectedObject, newPosition);
                commandManager.ExecuteCommand(moveCommand);
            }
        }

        // 缩放命令
        if (Input.GetKeyDown(KeyCode.S))
        {
            if (selectedObject != null)
            {
                Vector3 newScale = selectedObject.transform.localScale * 1.2f;
                ICommand scaleCommand = new ScaleCommand(selectedObject, newScale);
                commandManager.ExecuteCommand(scaleCommand);
            }
        }

        // 撤销
        if (Input.GetKeyDown(KeyCode.Z))
        {
            commandManager.Undo();
        }

        // 重做
        if (Input.GetKeyDown(KeyCode.Y))
        {
            commandManager.Redo();
        }

        // 宏命令示例
        if (Input.GetKeyDown(KeyCode.M))
        {
            if (selectedObject != null)
            {
                MacroCommand macro = new MacroCommand();
                macro.AddCommand(new MoveCommand(selectedObject, selectedObject.transform.position + Vector3.up));
                macro.AddCommand(new ScaleCommand(selectedObject, selectedObject.transform.localScale * 1.5f));
                commandManager.ExecuteCommand(macro);
            }
        }
    }
}
```

**使用场景：**
- 编辑器撤销/重做
- 游戏回放系统
- 操作日志
- 宏录制

## 设计模式的最佳实践

### 1. 何时使用设计模式

**使用设计模式的情况：**
- 代码重复度高
- 类之间耦合严重
- 扩展性差
- 维护困难

**避免过度设计的情况：**
- 简单的一次性代码
- 原型开发阶段
- 团队不熟悉设计模式

### 2. 设计模式的选择原则

**SOLID原则：**
- **S**ingle Responsibility Principle (单一职责原则)
- **O**pen/Closed Principle (开闭原则)
- **L**iskov Substitution Principle (里氏替换原则)
- **I**nterface Segregation Principle (接口隔离原则)
- **D**ependency Inversion Principle (依赖倒置原则)

**实际应用：**
```csharp
// 违反单一职责原则
public class GameManager
{
    public void UpdatePlayer() { }
    public void UpdateEnemy() { }
    public void UpdateUI() { }
    public void PlaySound() { }
    public void SaveData() { }
}

// 符合单一职责原则
public class PlayerManager
{
    public void UpdatePlayer() { }
}

public class EnemyManager
{
    public void UpdateEnemy() { }
}

public class UIManager
{
    public void UpdateUI() { }
}

public class AudioManager
{
    public void PlaySound() { }
}

public class DataManager
{
    public void SaveData() { }
}
```

### 3. 重构技巧

**识别代码异味：**
- 长方法
- 大类
- 重复代码
- 数据泥团
- 发散式变化

**重构步骤：**
1. 识别问题
2. 选择合适的设计模式
3. 逐步重构
4. 测试验证

## 总结与反思

### 设计模式的价值

1. **提高代码质量**：结构更清晰，维护更容易
2. **提高开发效率**：复用解决方案，减少重复工作
3. **提高团队协作**：统一的代码风格和架构
4. **提高系统扩展性**：新功能更容易添加

### 我的学习心得

1. **从问题出发**：不要为了使用设计模式而使用设计模式
2. **循序渐进**：从简单的设计模式开始学习
3. **实践为主**：理论结合实践，多写代码
4. **持续改进**：代码重构是一个持续的过程

### 给其他"废柴"的建议

1. **不要害怕重构**：好的代码是重构出来的
2. **学习经典案例**：研究优秀开源项目的设计模式应用
3. **保持简单**：能用简单方案解决的问题，不要用复杂的设计模式
4. **团队协作**：与团队成员讨论设计模式的应用

## 参考资料

- [设计模式：可复用面向对象软件的基础](https://book.douban.com/subject/1052241/)
- [Head First设计模式](https://book.douban.com/subject/2243615/)
- [重构：改善既有代码的设计](https://book.douban.com/subject/4262627/)
- [Clean Code](https://book.douban.com/subject/4199741/)

## 结语

设计模式不是银弹，而是工具。关键是要在合适的地方使用合适的设计模式，而不是为了使用设计模式而使用设计模式。

记住，好的代码是重构出来的。不要害怕重构，不要害怕犯错，每一次重构都是学习的机会。从简单的设计模式开始，逐步掌握更复杂的设计模式，最终成为代码架构的"艺术家"。

## 实用小贴士

### 🎯 设计模式学习路径
- [ ] 理解基本概念（SOLID原则）
- [ ] 掌握常用模式（单例、观察者、工厂）
- [ ] 学习高级模式（策略、命令、状态）
- [ ] 实践项目应用（重构现有代码）
- [ ] 团队协作推广（分享经验）

### 🚀 快速开始
```csharp
// 1. 识别代码问题
// 2. 选择合适的设计模式
// 3. 逐步重构代码
// 4. 测试验证效果

// 示例：将面条代码重构为单例模式
public class GameManager : MonoBehaviour
{
    private static GameManager _instance;
    public static GameManager Instance => _instance;

    void Awake()
    {
        if (_instance == null)
        {
            _instance = this;
            DontDestroyOnLoad(gameObject);
        }
        else
        {
            Destroy(gameObject);
        }
    }
}
```

### 💡 进阶技巧
- 使用依赖注入框架
- 实现事件驱动架构
- 应用微服务设计模式
- 学习领域驱动设计
- 掌握响应式编程模式
