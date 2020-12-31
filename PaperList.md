# paper list for joint entities and relations extraction[37篇]



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

<img src=".\img\14.png" alt="14" style="zoom: 50%;" />



### 7.Exploiting the Syntax-Model Consistency for Neural Relation Extraction [ACL2020]

**动机**：传统的使用GCN处理依存树的方法，没有很好的泛化能力，可能出现过拟合

同时之前提出的ON-LSTM模型只能考虑到单词左边的信息

**创新点**：本文提出一种基于上下文的**CEON-LSTM**模型，既考虑了左侧的信息也考虑了右侧的信息

提出了两种重要性评分标准，提高关键单词的重要程度。一个是语法重要性评分，使用依存树，距离最短依存路径越近评分越高；另一个是基于模型的重要性评分，这一评分、由CEON-LSTM编码的过程中给出

又提出了语法模型一致性和依存路径相似性的两个评判标准，并给出损失函数

**数据集**：ACE 05



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



### 3.End-to-End Neural Relation Extraction Using Deep Biaffine Attention [LNCS2019]

**关键词**：Bi-LSTM BiaffineAttention

**创新点**：在联合抽取模型中，使用双仿射注意力机制（Biaffine Attention）来对Bi-LSTM的输出层进行注意力评分

**数据集**：CoNLL 04

<img src=".\img\18.png" alt="18" style="zoom:67%;" />



## GNN



### 1.[GraphRel] GraphRel: Modeling Text as Relational Graphs for Joint Entity and Relation Extraction [ACL2019]

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



### 3.Let’s Stop Incorrect Comparisons in End-to-end Relation Extraction! [EMNLP2020]

针对之前的联合抽取论文，作者发现了这些论文中存在的错误对比的现象，文章总结了这些现象，并给出了实验

1.数据集和评价标准的不同

2.SBR标准间的对比：SBR分别为边界和实体类型全部识别正确；只识别边界；只识别类型



### 4.End-to-end named entity recognition and relation extraction using pre-trained language models [Arxiv2019]

**动机和创新点**：大多数前人的工作都依赖于外部工具，本文依赖于预训练的语言模型，不使用其他的NLP外部工具，能够较快的训练

**数据集**：ACE 04、ACE 05、CoNLL 04、ADE、I2B2

<img src=".\img\23.png" alt="23" style="zoom: 50%;" />



## 命名实体识别方向论文



### 1.Towards Improving Neural Named Entity Recognition with Gazetteers [ACL2019]

**关键词**：hybrid semi-Markov CRFs(HSCRFs) Gazetteers

**创新点**：使用外部字典gazetteers改进/增强HSCRFs

<img src=".\img\20.png" alt="20" style="zoom: 50%;" />



### 2.[GEANN] Gazetteer-Enhanced Attentive Neural Networks for Named Entity Recognition [EMNLP2019]

**动机**：基于region-based框架的命名实体识别，这种方法需要两种先验知识，命名知识和上下文知识，其中命名知识可以使用外部词典来减少全标注数据遇到的数据量瓶颈

**创新点**：提出了ANN（attentive neural network），显示建模上下文关系，方便整合外部信息

设计了一种辅助词典gazetteer网络，并将词典网络与ANN结合使用

<img src=".\img\22.png" alt="22" style="zoom: 50%;" />



### 3.[SAC] Similarity Based Auxiliary Classifier for Named Entity Recognition [EMNLP2019]

**动机**：传统方法随着实体长度加长结果会恶化，希望找到与实体长度无关的方法

**创新点**：提出一种SAC分类器（基于相似度的辅助分类器），这种分类器使用向量表示标签（是实体或非实体），然后计算这一标签与CNN编码后特征的相似度，进而在特征中添加这种相似度信息

**数据集**：CoNLL 2003、OntoNotes 5.0

<img src=".\img\25.png" alt="25" style="zoom: 50%;" />



### 4.[DGBiLSTM-CRF] Dependency-Guided LSTM-CRF for Named Entity Recognition [EMNLP2019]

**动机**：如何捕获完整依存树中的长距离关系是一个问题

现有的线性链结构不能捕获长距离关系

**创新点**：使用完整的依存树指导传统的LSTM-CRF模型，在LSTM层中，对每个词，整合他的依存树父亲节点的信息，使用一种交互函数（自身、连接、相加、多层感知机）

<img src=".\IMG\26.png" alt="26" style="zoom: 50%;" />



## 文本分类方向论文



### 1.[LEAM] Joint Embedding of Words and Labels for Text Classification [ACL2018]

使用label embedding来增强文本分类，提出了LEAM模型（标签嵌入注意力模型）

<img src=".\img\19.png" alt="19" style="zoom: 33%;" />



### 2.[Encoder1-Encoder2] Enhancing Local Feature Extraction with Global Representation for Neural Text Classification [EMNLP2019]

提出一种Encoder1-Encoder2结构，Encoder1负责获取全局特征，Encoder2负责提取局部信息

并设计一种两个编码器交互的方法

<img src=".\img\21.png" alt="21" style="zoom:67%;" />



### 3.Adversarial Reprogramming of Text Classification Neural Networks [EMNLP2019] ×

提出一种对抗重构的方法，将对抗示例的输入空间迁移到神经网络的输入空间，使用一种本文提出的上下文词汇重映射的方法



### 4.[FP-Net] Feature Projection for Improved Text Classification [ACL2020]

**动机**：一个句子中总有一些带有倾向性的词汇，还有一些没有倾向的词汇，本文希望继续减轻没有倾向词汇的影响

**创新点**：使用一种特征投射的方法，将句子分别投入两种特征提取器。其中一种提取共同特征（没有倾向的特征），另一种提取带有倾向性的特征，引入了一种域适应的方法GRL，特特征投射的方法。

<img src=".\img\24.png" alt="24" style="zoom:50%;" />



### 5.[HyperGAT] Be More with Less: Hypergraph Attention Networks for Inductive Text Classification [EMNLP2020]

提出使用一种超图GAT解决文档级别文本分类

使用超边来构建超图（序列超边和语义超边），之后使用GAT将特征在边和节点之间进行传递

<img src=".\IMG\27.png" alt="27" style="zoom:67%;" />



## 其他相关论文



### 1.Semi-supervised classification with graph convolutional networks [ICLR2017]

图卷积神经网络用于深度神经网络分类问题的经典文献，将切比雪夫多项式的谱域卷积应用于神经网络模型中，得到了一组特征映射公式，并将其应用与半监督分类问题中（结点的半监督分类）



### 2.Densely Connected Graph Convolutional Networks for Graph-to-Sequence Learning [TACL2019]

提出全连接卷积神经网络结构，能够继续更深层次网络的学习，其测试模型在机器翻译任务上



### 3.Probing Linguistic Features of Sentence-Level Representations in Relation Extraction [ACL2020]

验证不同的编码结构，产生的编码到底携带了那些信息，属于probe类的文章。

文章使用CNN、LSTM、GCN、transformer进行编码，对14种不同的属性都进行了验证



### 4.[Transformer] Attention Is All You Need [NeurlPS2017]

transformer经典之作，只使用attention机制既能做到并行计算，在机器翻译上的效果又好

可以学习这种只使用attention的思想，能不能用在联合关系抽取问题上

<img src=".\img\15.png" alt="15" style="zoom: 50%;" />



### 5.[TENER] Tener: Adapting transformer encoder for named entity recognition [ACL2019]

改进transformer，使之适合于命名实体识别任务中

**动机与创新点**：传统的transformer不能考虑方向信息（文章中进行了证明）

传统transformer中的缩放因子不适用于命名实体识别任务

因此提出了一组新的模型（公式），来对识别任务继续建模

添加了使用transformer进行字符级别特征提取的验证

<img src=".\img\16.png" alt="16" style="zoom:67%;" />



### 6.Deep Biaffine Attention for Neural Dependency Parsing

使用双仿射Biaffine attention机制来代替传统的attention机制

<img src=".\img\17.png" alt="17" style="zoom:67%;" />



### 7.Simplify the Usage of Lexicon in Chinese NER [ACL2020]

在表示层，使用一个字符的全部分词来对字符进行表示。



### 8.Named Entity Recognition for Social Media Texts with Semantic Augmentation [ACL2020]

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

