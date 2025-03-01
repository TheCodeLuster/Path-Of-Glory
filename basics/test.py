# nt

def foo(a):
    return a + 3

def baz(foo):
    b = 7
    return foo(b)

def main():
    # print(baz(foo))
    f = foo
    print(f(5))

if __name__ == "__main__":
    main()
