# buggy_calc.py
def calculate_average(numbers):
    """计算一个数字列表的平均值"""
    if not numbers:
        return 0
    total = sum(numbers)
    average = total / len(numbers)
    return average

# 测试用例
if __name__ == "__main__":
    test_list = [1, 2, 3, 4, 5]
    print(f"列表 {test_list} 的平均值是：{calculate_average(test_list)}")
    
    empty_list = []
    print(f"列表 {empty_list} 的平均值是：{calculate_average(empty_list)}")
