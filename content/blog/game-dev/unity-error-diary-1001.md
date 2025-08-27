---
author: LJoson
status: published
featured: false
title: "\U0001F62D Unity报错日记：第1001次想放弃"
description: Unity开发中常见错误的解决方案合集，记录我在Unity开发中遇到的各种奇葩问题和解决方法，记录技术废柴在游戏开发领域的成长轨迹
date: '2024-02-15'
category: 游戏开发
tags:
  - Unity
  - 游戏开发
  - 错误处理
  - C#
  - 踩坑经验
  - 跨界探索
---
# Unity报错日记：第1001次想放弃

> 作为一个手残党，在Unity开发中遇到的奇葩问题，以及我的解决思路

## 前言

作为一个技术废柴，我在Unity开发的道路上可谓是跌跌撞撞，每次遇到报错都让我怀疑人生。但是经过无数次的尝试和失败，我终于总结出了一些经验。这篇文章记录了我遇到的各种奇葩问题，以及我是如何一步步解决的。

## 常见报错类型及解决方案

### 1. NullReferenceException - 空引用异常

这是Unity中最常见的报错，没有之一。

#### 错误信息
```
NullReferenceException: Object reference not set to an instance of an object
```

#### 常见原因
- 组件未正确赋值
- GameObject被销毁但脚本仍在运行
- 序列化字段未在Inspector中设置

#### 解决方案

```csharp
// 错误示例
public class PlayerController : MonoBehaviour
{
    public Rigidbody rb; // 可能为null

    void Start()
    {
        rb.AddForce(Vector3.up * 10f); // 报错！
    }
}

// 正确示例
public class PlayerController : MonoBehaviour
{
    [SerializeField] private Rigidbody rb;

    void Start()
    {
        // 方法1：检查null
        if (rb != null)
        {
            rb.AddForce(Vector3.up * 10f);
        }

        // 方法2：自动获取组件
        if (rb == null)
        {
            rb = GetComponent<Rigidbody>();
        }

        // 方法3：使用TryGetComponent
        if (TryGetComponent<Rigidbody>(out Rigidbody rigidbody))
        {
            rigidbody.AddForce(Vector3.up * 10f);
        }
    }
}
```

### 2. MissingReferenceException - 丢失引用异常

这个错误通常发生在场景切换或对象销毁后。

#### 错误信息
```
MissingReferenceException: The object of type 'GameObject' has been destroyed but you are still trying to access it.
```

#### 解决方案

```csharp
public class GameManager : MonoBehaviour
{
    private GameObject player;

    void Update()
    {
        // 错误示例
        if (player != null)
        {
            player.transform.position = Vector3.zero; // 可能报错
        }

        // 正确示例
        if (player != null && player != null)
        {
            player.transform.position = Vector3.zero;
        }

        // 更好的方法：使用Object.ReferenceEquals
        if (!Object.ReferenceEquals(player, null))
        {
            player.transform.position = Vector3.zero;
        }
    }
}
```

### 3. IndexOutOfRangeException - 数组越界异常

在操作数组或List时经常遇到。

#### 错误信息
```
IndexOutOfRangeException: Index was outside the bounds of the array.
```

#### 解决方案

```csharp
public class ItemManager : MonoBehaviour
{
    public List<GameObject> items = new List<GameObject>();

    void Start()
    {
        // 错误示例
        GameObject firstItem = items[0]; // 如果列表为空会报错

        // 正确示例
        if (items.Count > 0)
        {
            GameObject firstItem = items[0];
        }

        // 使用安全的访问方法
        GameObject GetItem(int index)
        {
            if (index >= 0 && index < items.Count)
            {
                return items[index];
            }
            return null;
        }
    }
}
```

### 4. Coroutine相关错误

协程是Unity中常用的功能，但也容易出错。

#### 常见问题
- 协程在对象销毁后仍在运行
- 重复启动同一个协程
- 协程中的空引用

#### 解决方案

```csharp
public class CoroutineManager : MonoBehaviour
{
    private Coroutine currentCoroutine;

    void Start()
    {
        // 错误示例
        StartCoroutine(MyCoroutine());
        StartCoroutine(MyCoroutine()); // 重复启动

        // 正确示例
        if (currentCoroutine != null)
        {
            StopCoroutine(currentCoroutine);
        }
        currentCoroutine = StartCoroutine(MyCoroutine());
    }

    IEnumerator MyCoroutine()
    {
        while (true)
        {
            // 检查对象是否还存在
            if (this == null || gameObject == null)
            {
                yield break; // 退出协程
            }

            yield return new WaitForSeconds(1f);
        }
    }

    void OnDestroy()
    {
        // 清理协程
        if (currentCoroutine != null)
        {
            StopCoroutine(currentCoroutine);
        }
    }
}
```

### 5. 序列化相关错误

在保存和加载数据时经常遇到。

#### 错误信息
```
SerializationException: Type 'MyClass' is not marked as serializable.
```

#### 解决方案

```csharp
// 错误示例
public class MyClass
{
    public string name;
    public int value;
}

// 正确示例
[System.Serializable]
public class MyClass
{
    public string name;
    public int value;
}

// 如果需要自定义序列化
[System.Serializable]
public class CustomSerializableClass : ISerializationCallbackReceiver
{
    [SerializeField] private string serializedName;
    [SerializeField] private int serializedValue;

    public string Name { get; set; }
    public int Value { get; set; }

    public void OnBeforeSerialize()
    {
        serializedName = Name;
        serializedValue = Value;
    }

    public void OnAfterDeserialize()
    {
        Name = serializedName;
        Value = serializedValue;
    }
}
```

## 调试技巧

### 1. 使用Debug.Log进行调试

```csharp
public class DebugHelper : MonoBehaviour
{
    void Start()
    {
        Debug.Log("游戏开始");
        Debug.LogWarning("这是一个警告");
        Debug.LogError("这是一个错误");

        // 条件调试
        #if UNITY_EDITOR
        Debug.Log("只在编辑器中显示");
        #endif

        // 格式化输出
        Debug.LogFormat("玩家位置: {0}, 生命值: {1}", transform.position, 100);
    }
}
```

### 2. 使用断点调试

在Visual Studio或Rider中设置断点，然后使用Unity的调试模式。

### 3. 使用Unity Profiler

分析性能问题，找出卡顿的原因。

## 预防措施

### 1. 代码规范

```csharp
// 使用属性而不是公共字段
public class Player : MonoBehaviour
{
    [SerializeField] private float health = 100f;
    [SerializeField] private float speed = 5f;

    public float Health
    {
        get => health;
        set => health = Mathf.Clamp(value, 0f, 100f);
    }

    public float Speed
    {
        get => speed;
        set => speed = Mathf.Max(0f, value);
    }
}
```

### 2. 使用[RequireComponent]特性

```csharp
[RequireComponent(typeof(Rigidbody))]
[RequireComponent(typeof(Collider))]
public class PlayerController : MonoBehaviour
{
    private Rigidbody rb;
    private Collider col;

    void Awake()
    {
        rb = GetComponent<Rigidbody>();
        col = GetComponent<Collider>();
    }
}
```

### 3. 使用[SerializeField]和[Header]

```csharp
public class Enemy : MonoBehaviour
{
    [Header("基础属性")]
    [SerializeField] private float health = 100f;
    [SerializeField] private float damage = 10f;

    [Header("移动设置")]
    [SerializeField] private float moveSpeed = 3f;
    [SerializeField] private float rotationSpeed = 90f;

    [Header("攻击设置")]
    [SerializeField] private float attackRange = 2f;
    [SerializeField] private float attackCooldown = 1f;
}
```

## 常见陷阱

### 1. 在Update中使用FindObjectOfType

```csharp
// 错误示例 - 性能极差
void Update()
{
    Player player = FindObjectOfType<Player>();
    if (player != null)
    {
        // 处理逻辑
    }
}

// 正确示例
private Player player;

void Start()
{
    player = FindObjectOfType<Player>();
}

void Update()
{
    if (player != null)
    {
        // 处理逻辑
    }
}
```

### 2. 在协程中使用yield return null

```csharp
// 错误示例 - 每帧执行
IEnumerator BadCoroutine()
{
    while (true)
    {
        // 处理逻辑
        yield return null; // 每帧执行，性能差
    }
}

// 正确示例
IEnumerator GoodCoroutine()
{
    while (true)
    {
        // 处理逻辑
        yield return new WaitForSeconds(0.1f); // 每0.1秒执行一次
    }
}
```

### 3. 忘记清理事件监听

```csharp
public class EventManager : MonoBehaviour
{
    void OnEnable()
    {
        GameEvents.OnPlayerDeath += HandlePlayerDeath;
    }

    void OnDisable()
    {
        // 重要：清理事件监听
        GameEvents.OnPlayerDeath -= HandlePlayerDeath;
    }

    void HandlePlayerDeath()
    {
        Debug.Log("玩家死亡");
    }
}
```

## 总结

Unity开发中的报错是不可避免的，但通过良好的编程习惯和调试技巧，我们可以大大减少错误的发生。记住以下几点：

1. **总是检查null引用**
2. **使用适当的访问修饰符**
3. **及时清理资源**
4. **编写防御性代码**
5. **善用调试工具**

虽然有时候真的想放弃，但每次解决一个bug后的成就感是无可替代的。作为一个技术废柴，我深知学习Unity的道路并不容易，但只要坚持下去，总会有所收获。

---

*标签：Unity, 游戏开发, 报错处理, 调试技巧, 踩坑经验*
