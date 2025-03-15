# binary search BigO(logn)
def bs(list, item):
    low = 0
    high = len(list) - 1
    
    while low <= high:
        mid = (low + high) // 2
        guess = list[mid]
        
        if guess > item:
            high = mid - 1
        elif guess < item:
            low = mid + 1
        else:
            return mid
    return None


def main():
    my_list = [1, 3, 5, 7, 9, 11, 13]
    
    print(bs(my_list, 13)) # => 6

if __name__ == "__main__":
    main()
