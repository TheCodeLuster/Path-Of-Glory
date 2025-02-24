// Most info from // https://www.youtube.com/watch?v=N2bXEUSAiTI&ab_channel=georgehotzarchive 
// This will be in pseudocode, although in c, 'cause i like this comments lol

/*

output = f (x, y)

f (x, y):
    f (x - 1, y - 1)

bubble sort: O(n^2)
for i in 0..n:
    for j in i+1..n:
        if i > j:
            swap arr[i] and arr[j]

tree:
n inserts into a log(n) sized tree

i.e:
7 3 4 6 10 5

height: log(n)
--      7
--  3       10
--   4
--  5  6

O (n * log(n))

O(n) sort:
1 and 100

int cnt[100] = {0};
for i in 0..n: 
    cnt[arr[i]] += 1
for i in 0..sizeof(cnt):
    print("i" * cnt[i])

binary search:
find an element in a sorted list

n = 7

O(log(n))

1 7 11 24 52 77 87

bsearch(arr, 77):
    low = 0
    high = len(arr)

    mid_point = (low + high) / 2

    arr[mid_point] is 24
    low = mid_point 

24 52 77 87
bsearch(arr, 77):
    low = 0
    high = len(arr)

    mid_point = (low + high) / 2

    arr[mid_point] is 52
    low = mid_point

52 77 87
run again 

mid_point is 77 // what we were looking for

*/
