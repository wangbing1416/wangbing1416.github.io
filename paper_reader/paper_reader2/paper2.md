**GraphRel： Modeling text as relational graphs for joint entity and relation extraction**

**2019 ACL**

*cited by "Attention as Relation: Learning Supervised Multi-head Self-Attention for Relation Extraction"*



------

# 摘要

​	本文提出了一种**GraphRel**模型，一种端到端的联合抽取模型，使用图卷积神经网络进行实体和关系间的联合抽取

​	相比之前的研究，本文通过一个**关系加权的图卷积神经网络GCN**来考虑命名实体和关系之间的交互



​	使用线性模型和依赖结构都能被用作提取序列和区域特征，一个完整的词图谱用来进一步提取词之间的隐含特征



​	在数据集**NYT**和**WebNLG**上进行测试



# 引言



有三个关键方面还没有在一个统一的框架中得到充分处理：

- 端到端的联合抽取模型
- 预测重叠的关系
- 考虑关系之间的相互作用，尤其是重叠关系



**传统的提取方法**

- 一种pipeline的方式

**联合提取方法**

- 充分利用了两种关系之间的相互作用

- 在展示联合提取模型的好处的同时，这些复杂的方法是基于特征的结构化学习系统，因此严重依赖特征工程



==挑战1==

随着深度神经网络的成功应用，基于神经网络的自动特征学习方法已被应用于关系提取

1.使用在两个实体之间的词序列：

- CNN
- LSTM
- Tree-LSTM

2.两个实体间的最短决策树

3.最小选区子树生成两个实体（minimal constituency sub-tree spanning）



*[论文解读 ： Relation classification via convolutional deep neural network](https://wangbing1416.github.io/paper_reader/paper_reader3/paper3.html)*



但是这种深度学习方法，不是端到端的联合抽取方法。



==挑战2== ： 考虑关系之间的相互作用

**共同实体间的关系共享**

*(Barack- Obama, PresidentOf, UnitedStates)* 可以由 *(BarackObama, Governance, United- States)*进行关系“转让”/迁移，这两个三元组展示了EntityPairOverlap

也可以由(BarackObama, LiveIn, WhiteHouse) 和 (WhiteHouse, PresidentialPalace, UnitedStates)进行“转让”，这两个三元组展示了SingleEntityOverlap

​	2017年“Graph convolution over pruned dependency trees improves relation extraction”提出了使用LSTM序列来继续联合关系抽取，但是他们最终也放弃对重叠关系的处理



​	本文所提出的**GraphRel**模型是一种联合抽取模型，第一次共同处理了关系抽取问题中的三个关键问题【问题：前人的论文中没有考虑到这些问题嘛？】

​	**GraphRel**可以学习通过**Bi-LSTM句编码器**和**GCN依赖树编码**自动提取隐藏层特征，**GraphRel**标注实体词并预测实体之间的关系三元组，这是第一阶段（1st-phase）的预测

​	同时**GraphRel**添加了一个较为新颖的第二阶段（2nd-phase）关系权重GCN



​	<u>在实体损失和关系损失的指导下，第一阶段GraphRel在建立新的带关系加权边的全连通图时，沿着依赖链接提取节点隐藏特征</u>

​	<u>然后，通过对中间图的运算，第2阶段的GCN有效地考虑了实体以及每条边最终分类前的(可能重叠的)关系的交互</u>















------

[1]    T.-J. Fu, P.-H. Li, and W.-Y. Ma, “GraphRel: Modeling Text as Relational Graphs for Joint Entity and Relation Extraction,” in *Proceedings of the 57th Annual Meeting of the Association for Computational Linguistics*, 2019, pp. 1409–1418, doi: 10.18653/v1/P19-1136.

[2]    D. Zeng, K. Liu, S. Lai, G. Zhou, and J. Zhao, “Relation classification via convolutional deep neural network,” 2014.