**Relation classification via convolutional deep neural network**

**COLING 2014**



------

# 摘要

过去的基于统计的关系抽取的方法的性能非常依赖于提取的特征的质量，这些特征提取往往来自于现存的NLP系统，这会导致误差的传播

这篇论文提出了一种卷积深度神经网络**CDNN**，用来提取词和局层次上的特征

1. 词嵌入

2. 根据给定的名词来抽取**词层次**的特征

3. 同时**句层次**的特征使用卷积的方法进行学习

4. **这两个层次的特征将被链接成为最终提取出的特征**

5. 最后这些特征被放进softmax分类器进行分类

   .

# 引言

已知：给定句子**S**，和人工标注的实体对**e1**和**e2**

所求：两个实体**e1**和**e2**之间的关系

.

目前最有效的方法是监督范式，监督方法可以被分为：

- 基于特征方法
- 基于核方法：依赖解析树

.

这些方法确实有效，因为他们基于语言学的知识，但是他们的方法总是来源于已存在的NLP系统，会导致误差传播

.

为了识别实体关系，有必要将词句层次的线索结合到不同的语义结构

> **The [fire] *e1* inside WTC was caused by exploding [fuel] *e2***

想要识别出fire和fuel的因果关系，我们需要利用被标注的名词和整个句子的意思

.

*“Natural language processing (almost) from scratch”*这篇论文中所有的任务都被看作**序列标注**问题

然而我们的“关系分类”是一种**多种类分类问题**multi-class，我们则会使用不同的函数

同时，有必要明确指出我们希望为哪些对的词指定关系标签，因此引入了位置特征**PF**

.

所以总之，本文的贡献在于：

- **使用卷积深度神经网络，在词和句层次的特征进行提取**
- **为了指定关系标签应该分配个哪个词对，引入了位置特征**
- **使用SemEval-2010 Task 8数据集进行试验**

.

# 相关工作

.

.

# 方法

.

<img src=".\1.png" alt="1" style="zoom:80%;" />

上图展示了本文使用的神经网络的结构

.

#### 步骤一 词表示

word embedding

.

#### 步骤二  词层次的特征提取

传统的提取方式，特征包括：词本身、单词对的类型和两个实体之间的单词序列

本文选取的特征：标记名词的词向量、上下文标记、**WordNet中的上位词**（the WordNet hypernyms,出现于MVRNN (Socher et al., 2012).）

| Features |             Remark              |
| :------: | :-----------------------------: |
|    L1    |             Noun 1              |
|    L2    |             Noun 2              |
|    L3    | Left and right tokens of noun 1 |
|    L4    | Left and right tokens of noun 2 |
|    L5    |   WordNet hypernyms of nouns    |

.

#### 步骤三 句层次的特征提取 * * 

<img src=".\2.png" alt="2" style="zoom:80%;" />

**1.词特征**

<img src=".\3.png" alt="3" style="zoom:80%;" />

将词从0开始标记，标记之后为(x0, x1, · · · , x6)

使用滑动窗口，设置窗口尺寸w=3，那么词特征**WF**被表示为：

<img src=".\4.png" alt="4" style="zoom:50%;" />

**2.位置特征**

记录每个词关于两个实体之间的相对位置，之后将词特征和位置特征进行简单的串联，得到最终的特征向量

**3.卷积**

<img src=".\5.png" alt="5" style="zoom: 50%;" />

使用上述线性变换，对特征进行卷积

**X** 是n0×t的矩阵，**n0**=w×n,**n**是超参数，决定了特征向量的维度，**w**是移动窗口的大小，**t**是词的数量

**W1** 是n1×n0的矩阵，**n1**是超参数，是隐藏层的大小

4.**形成句层次的特征向量**

使用双曲正切作为激活函数进行一次非线性变换

.

#### 步骤四 输出

将词水平的特征和句水平的特征进行串联，先经过一次线性变换，最终输入softmax分类器中进行分类

.

# 实验

#### 确定参数

![6](.\6.png)

通过对照试验，得到较好的参数选择为：

![7](.\7.png)

.

#### 整体实验结果

![8](.\8.png)

.

#### 特征的影响

<img src=".\9.png" alt="9" style="zoom:67%;" />

可以说明位置向量的增加，对模型的影响很大

.

.

.

------

D. Zeng, K. Liu, S. Lai, G. Zhou, and J. Zhao, “Relation classification via convolutional deep neural network,” 2014.

[https://blog.csdn.net/qq_35273499/article/details/80775004](https://blog.csdn.net/qq_35273499/article/details/80775004)