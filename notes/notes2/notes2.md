#### 情感分析 pytorch

视频地址 ： https://www.bilibili.com/video/BV1ta4y1t7EK?from=search&seid=8737807098902898192



------

```
import torch
from torchtext import data, datasets

import random


SEED = 1234

torch.manual_seed(SEED)  # 初始化种子

# pip install -i https://pypi.tuna.tsinghua.edu.cn/simple -U spacy
# python -m spacy download en
# 使用管理员身份运行anaconda prompt

# Field :主要包含以下数据预处理的配置信息，比如指定分词方法，是否转成小写，起始字符，结束字符，补全字符以及词典等等
TEXT = data.Field(tokenize='spacy')  # 分词函数
LABEL = data.LabelField(dtype=torch.float)

train_data, test_data = datasets.IMDB.splits(TEXT, LABEL)  # 下载数据集 datasets

# print(f'number of training examples:{len(train_data)}')  # f表示格式化字符串
# print(f'number of testing examples:{len(test_data)}')
#
# print(vars(train_data.examples[0]))  # vars() 函数返回对象object的属性和属性值的字典对象

train_data, valid_data = train_data.split(random_state=random.seed(SEED))  # 默认打乱分割，添加种子可以每次分割的结果相同

# print(f'number of training examples:{len(train_data)}')
# print(f'number of validation examples:{len(valid_data)}')
# print(f'number of testing examples:{len(test_data)}')
# number of training examples:17500
# number of validation examples:7500
# number of testing examples:25000

TEXT.build_vocab(train_data, max_size=25000, vectors="glove.6B.100d", unk_init=torch.Tensor.normal_)
LABEL.build_vocab(train_data)

print(f"unique tokens in TEXT vocabulary:{len(TEXT.vocab)}")
print(f"unique tokens in LABEL vocabulary:{len(LABEL.vocab)}")
```