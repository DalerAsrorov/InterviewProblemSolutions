

class Observable {
    constructor(subscribe) {
        this._subscribe = subscribe;
    }

    subscribe(obs) {
        const observer = new Observer(obs);

        observer._unsubscribe = this._subscribe(observer);

        return ({
            unsubscribe() {
                observer.unsubscribe();
            }
        })
    }

    static from(values) {
        return new Observable((observer) => {
            values.forEach((value) => observer.next(value));

            observer.complete();

            return () => {
                console.log('Observable.from: unsubscribed');
            }
        });
    }
}

class Observer {
    constructor(handlers) {
        this.handlers = handlers; // next, error and complete logic
        this.isUnsubscribed = false;
    }

    next(value) {
        if (this.handlers.next && !this.isUnsubscribed) {
            this.handlers.next(value);
        }
    }

    error(error) {
        if (!this.isUnsubscribed) {
            if (this.handlers.error) {
                this.handlers.error(error);
            }
        }

        this.unsubscribe();
    }

    complete() {
        if (!this.isUnsubscribed) {
            if (this.handlers.complete) {
                this.handlers.complete();
            }

            this.unsubscribe();
        }
    }

    unsubscribe() {
        this.isUnsubscribed = true;

        if (this._unsubscribe) {
            this._unsubscribe();
        }
    }
}

const numbers$ = Observable.from([0, 1, 2, 3, 4]);
const subscription = numbers$.subscribe({
    next(value) {
        console.log(value);
    },
    error(err) {
        console.error(err);
    },
    complete() {
        console.info('done');
    }
});

setTimeout(subscription.unsubscribe, 500)