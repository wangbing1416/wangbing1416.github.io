# paper list for joint entities and relations extraction[19篇]



[TOC]

## 关系分类



### 1.Relation classification via convolutional deep neural network [COLING2014]



### 2.Classifying Relations via Long Short Term Memory Networks along Shortest Dependency Paths [EMNLP2015]

**关键词**：SDP LSTM

**创新点**：最短依存路径中只保存相关信息

多通道的LSTM，通过SDP从异构源进行信息集成

定制正则化策略

**数据集**：SemEval-2010 Task 8

<img src=".\img\1.png" alt="1" style="zoom: 67%;" />



### 3.Improved Relation Classification by Deep Recurrent Neural Networks with Data Augmentation [COLING2016]

**关键词**：SDP LSTM

**动机**：浅层结构不能探索不同抽象级别的潜在表示空间

**创新点**：使用深度RNN继续关系分类

增加了数据增强的结构（将依存树左右翻转，形成另一种关系）

**数据集**：SemEval-2010 Task 8

<img src=".\img\2.png" alt="2" style="zoom: 67%;" />



### 4.Graph Convolution over Pruned Dependency Trees Improves Relation Extraction [EMNLP2018]

**关键词**：GCN dependency LSTM

**动机**：现存的使用依存树的模型不能并行计算，计算效率低

SDP有限制，可能会丢失一些路径外的有用信息

依存树可能会被过度修剪

**创新点**：在依存树上使用GCN来提取特征

提出一种中心修剪的方法，既不会过度修剪，也会保留非路径上的有用信息

在GCN前，加一层Bi-LSTM来整合上下文信息，称为情景化GCN（C-GCN）

将前人提出的神经网络模型PA-LSTM与C-GCN结合，进行实验

**数据集**：TECRED、SemEval-2010 Task 8

<img src=".\img\12.png" alt="12" style="zoom:67%;" />



### 5.Attention Guided Graph Convolutional Networks for Relation Extraction [ACL2019]

**关键词**：GCN densely attention

**动机**：现存基于规则的硬修剪策略，不总产生最优效果

**创新点**：将全连接GCN用于关系分类任务中，使图能够经过更深层网络的训练

在attention guided层中使用multi-head attention

**数据集**：TACRED、SemEval-2010 Task 8

<img src=".\img\13.png" alt="13" style="zoom:67%;" />



### 6.Graph Neural Networks with Generated Parameters for Relation Extraction [ACL2019]

**关键词**：GCN

**动机**：传统GCN解决多跳关系抽取问题都是使用预定义的图来进行处理

**创新点**：使用句子中的实体来构建全连接图，再使用编码模块、传播模块和分类模块进行处理

**数据集**：

<img src=".\img\14.png" alt="14" style="zoom:67%;" />



## LSTM



### 1.End-to-End Relation Extraction using LSTMs on Sequences and Tree Structures [ACL2016]

**关键词**：SDP Bi-LSTM

**动机**：之前的联合抽取都是基于人工特征的学习

之前的LSTM只有有限的语义结构，不能进行联合抽取

**创新点**：提出了LSTM-RNN的端到端结构

将词序列和依存树共同作为输入

使用了两个增强功能：实体预训练、预定采样

**数据集**：SemEval-2010 Task 8、ACE 05、ACE 04

<img src=".\img\3.png" alt="3" style="zoom:67%;" />



### 2.Joint entity and relation extraction based on a hybrid neural network [Neurocomputing2017]

**关键词**：LSTM Bi-LSTM CNN

**动机**：*“End-to-End Relation Extraction using LSTMs on Sequences and Tree Structures”* 使用两层线性层进行实体识别，忽略的便签间的长期关系。

**创新点**：将LSTM用于实体识别过程，在关系分类中使用CNN进行解码

传入关系分类的信息有两个实体的隐藏层向量、两个实体间的子句信息

**数据集**：ACE 05

<img src=".\img\4.png" alt="4" style="zoom:67%;" />



### 3.Adversarial training for multi-context joint entity and relation extraction [EMNLP2018]

**关键词**：Bi-LSTM Adversarial

**动机**：第一次将对抗学习应用于联合抽取问题中

**创新点**：提出使用字符级的向量和单词级别的向量进行结合（为了获取前后缀信息）

softmax进行实体分类 CRF进行命名实体识别

添加对抗学习，即加入一些噪音增强模型的鲁棒性，噪音是原词的一个变种（使损失函数最大的扰动）

**数据集**：ACE 04、CoNLL 04、DREC、ADE

<img src=".\img\7.png" alt="7" style="zoom:67%;" />



## CNN



### 1.Global Normalization of Convolutional Neural Networks for Joint Entity and Relation Classification [EMNLP2017]

**关键词**：CNN

**动机**：以往的联合抽取都只是将实体传入关系分类，如果已知实体的类型，那么他们的关系的搜索空间可能会减少

**创新点**：提出了一种全局规范化的方式，将句子直接编码为三个向量的序列，对其分别进行分类

将实体分为六段，分别经过卷积池化后拼接（六段：每个实体将句子分成三段）

**数据集**：ERR

<img src=".\img\5.png" alt="5" style="zoom:67%;" />



## LSTM + attention



### 1.Going out on a limb: Joint Extraction of Entity Mentions and Relations without Dependency Trees [ACL2017]

**关键词**：LSTM Bi-LSTM attention

**动机**：SPTree 依赖于依存树，将其限制在了句水平的抽取，而且需要良好的依存树

**创新点**：使用attention的RNN进行建模

使用attention的方式来对每个实体进行实体连接

可以解决重叠关系问题（分配1/N的权重）

**数据集**：ACE 05、ACE 04

<img src=".\img\6.png" alt="6" style="zoom:67%;" />



### 2.Joint entity recognition and relation extraction as a multi-head selection problem [Expert Systems with Applications2018]

**关键词**：Bi-LSTM attention

**动机**：前人的特征往往使用很多外部的NLP工具（POS、依存树）

*“Going out on a limb: Joint Extraction of Entity Mentions and Relations without Dependency Trees”*虽然用了attention，但是没有从根本上解决关系重叠问题

**创新点**：使用Bi-LSTM分别获取前后缀表示

将关系抽取看作是多头（多标签）分类问题

**数据集**：ACE 04、ADE、DREC、CoNLL 04

<img src=".\img\8.png" alt="8" style="zoom:67%;" />



## GNN



### 1.GraphRel: Modeling Text as Relational Graphs for Joint Entity and Relation Extraction

**关键词**：Bi-LSTM Bi-GCN

**创新点**：提出一种基于GCN的联合抽取方法，使用线性结构和依存结构

一种两阶段的双向GCN结构。第一阶段只为得到两个损失值并向第二阶段传送数据，目的不在于预测结果；第二阶段使用多图GCN，为每一种关系赋予一张关系权重图，在每张图上分别进行GCN，再进行命名实体识别的关系分类。

**数据集**：NYT、WebNLG

<img src=".\img\11.png" alt="11" style="zoom:67%;" />



## 共同编码



### 1.Joint Extraction of Entities and Relations Based on a Novel Tagging Scheme [ACL2017]

**创新点**：设计了一种新的标注方案，并将这种标签用于编码解码器中（end-to-end）
为模型设计了一种偏置损失函数

**数据集**：NYT

<img src=".\img\9.png" alt="9" style="zoom:67%;" />

<img src=".\img\10.png" alt="10" style="zoom:67%;" />



## 其他联合抽取论文



### 1.More Data, More Relations, More Context and More Openness: A Review and Outlook for Relation Extraction [ArXiv2020]

关系抽取2020年最新综述论文



### 2.CoType: Joint Extraction of Typed Entities and Relations with Knowledge Bases [WWW2017] ×

提出了一种基于外部知识库的联合抽取框架。



## 其他相关论文



### 1.Semi-supervised classification with graph convolutional networks [ICLR2017]

图卷积神经网络用于深度神经网络分类问题的经典文献，将切比雪夫多项式的谱域卷积应用于神经网络模型中，得到了一组特征映射公式，并将其应用与半监督分类问题中（结点的半监督分类）



### 2.Densely Connected Graph Convolutional Networks for Graph-to-Sequence Learning [TACL2019]

提出全连接卷积神经网络结构，能够继续更深层次网络的学习，其测试模型在机器翻译任务上



### 2.Simplify the Usage of Lexicon in Chinese NER [ACL2020]

在表示层，使用一个字符的全部分词来对字符进行表示。



### 3.Named Entity Recognition for Social Media Texts with Semantic Augmentation [ACL2020]

**创新点**：将数据（语义）增强用于社交媒体的命名实体识别中，用来解决社交媒体数据样本稀疏问题。本文使用与每个词相近的词对原词进行数据增强，相近的词指的是在embedding中k近邻最短的词。



## 常用数据集



### 1.SemEval-2010 Task 8

**用途**：用于关系分类

**特征**：被标记实体词的句子

**标签**：19种关系（9*2+1 九种直接关系，一种非直接关系other）

**数据量**：8000 训练数据 2717 测试数据

**例子**："A person infected with a particular <e1>flu</e1> <e2>virus</e2> strain develops an antibody against that virus." - > Cause-Effect(e2, e1)



### 2.ACE 05



### 3.ACE 04



### 4.ERR



### 5.NYT



### 6.CoNLL 04



### 7.TECRED



### 8.WebNLG



### 9.DREC



### 10.ADE

