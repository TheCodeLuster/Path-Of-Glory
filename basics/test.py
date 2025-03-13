# nt

def foo(a):
    return a + 3

# def bar():
#     pass

def baz(foo):
    b = 7
    return foo(b)
    
# binary search
def binary_search(lst, item):
    low = 0
    high = len(lst) - 1

    while low <= high:
        mid = (low + high) // 2  # Divide by 2 to get the middle index
        guess = lst[mid]
        
        if guess > item:
            high = mid - 1
        elif guess < item:
            low = mid + 1
        else:
            return mid
    return None


def main():
    # print(baz(foo))
    # f = foo
    # print(f(5))
    my_list = [1, 2, 3, 4, 5, 6, 7]
    print(binary_search(my_list, 2))  # => 1

if __name__ == "__main__":
    main()