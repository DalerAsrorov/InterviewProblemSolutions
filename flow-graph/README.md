# Behavioral Flow Graph:

```
|---register_button (10)
|    |---register_email (4)
|    |    |---email_already_exists (1)
|    |    |---register_success (3)
|    |---register_facebook (4)
|    |    |---register_success (4)
|    |---dropoff (2)
|---login_button (10)
|    |---login_email (4)
|    |    |---login_success (4)
|    |---login_facebook (4)
|    |    |---login_success (3)
|    |    |---login_failure (1)
|    |---dropoff (2)
```

```
Sample Input:
user_id, timestamp, action
100, 1000, A
200, 1003, A
300, 1009, B
100, 1026, B
100, 1030, C
200, 1109, B
200, 1503, A
```

```
Sample Output:

Tree from the Input:
|---A (2)
| |---B (2)
| | |---C (1)
| | |---A (1)
|---B (1)
```
