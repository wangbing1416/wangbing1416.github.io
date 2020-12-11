# paper list for joint entities and relations extraction



[TOC]

## 关系分类



### Relation classification via convolutional deep neural network [COLING2014]



### Classifying Relations via Long Short Term Memory Networks along Shortest Dependency Paths [EMNLP2015]

**创新点**：最短依存路径中只保存相关信息

多通道的LSTM，通过SDP从异构源进行信息集成

定制正则化策略

**数据集**：SemEval-2010 Task 8

<img src=".\img\1.png" alt="1" style="zoom: 67%;" />



### Improved Relation Classification by Deep Recurrent Neural Networks with Data Augmentation [COLING2016]

**动机**：浅层结构不能探索不同抽象级别的潜在表示空间

**创新点**：使用深度RNN继续关系分类

增加了数据增强的结构（将依存树左右翻转，形成另一种关系）

**数据集**：SemEval-2010 Task 8

<img src=".\img\2.png" alt="2" style="zoom: 67%;" />



## 共享参数



### End-to-End Relation Extraction using LSTMs on Sequences and Tree Structures [ACL2016]

**动机**：之前的联合抽取都是基于人工特征的学习

之前的LSTM只有有限的语义结构，不能进行联合抽取

**创新点**：提出了LSTM-RNN的端到端结构

将词序列和依存树共同作为输入

使用了两个增强功能：实体预训练、预定采样

**数据集**：SemEval-2010 Task 8、ACE 05、ACE 04

<img src=".\img\3.png" alt="3" style="zoom:67%;" />



### Joint entity and relation extraction based on a hybrid neural network [Neurocomputing2017]

**动机**：*“End-to-End Relation Extraction using LSTMs on Sequences and Tree Structures”* 使用两层线性层进行实体识别，忽略的便签间的长期关系。

**创新点**：将LSTM用于实体识别过程，在关系分类中使用CNN进行解码

传入关系分类的信息有两个实体的隐藏层向量、两个实体间的子句信息

数据集：ACE 05

<img src=".\img\4.png" alt="4" style="zoom:67%;" />



### Global Normalization of Convolutional Neural Networks for Joint Entity and Relation Classification [EMNLP2017]



### Going out on a limb: Joint Extraction of Entity Mentions and Relations without Dependency Trees [ACL2017]



### Adversarial training for multi-context joint entity and relation extraction [EMNLP2018]



### Joint entity recognition and relation extraction as a multi-head selection problem [Expert Systems with Applications2018]



## 共同编码



### Joint Extraction of Entities and Relations Based on a Novel Tagging Scheme [ACL2017]



## 其他联合抽取论文



### More Data, More Relations, More Context and More Openness: A Review and Outlook for Relation Extraction [ArXiv2020]

关系抽取2020年最新综述论文



### CoType: Joint Extraction of Typed Entities and Relations with Knowledge Bases [WWW2017] ×

提出了一种基于外部知识库的联合抽取框架。



## 其他相关论文



### Simplify the Usage of Lexicon in Chinese NER [ACL2020]

在表示层，使用一个字符的全部分词来对字符进行表示。



### Named Entity Recognition for Social Media Texts with Semantic Augmentation [ACL2020]

**创新点**：将数据（语义）增强用于社交媒体的命名实体识别中，用来解决社交媒体数据样本稀疏问题。本文使用与每个词相近的词对原词进行数据增强，相近的词指的是在embedding中k近邻最短的词。



## 常用数据集



#### SemEval-2010 Task 8



#### ACE 05



#### ACE 04



#### ERR



#### NYT



#### CoNLL 04



#### DREC



#### ADE

