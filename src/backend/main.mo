import Nat "mo:base/Nat";

actor Counter {
    private stable var count: Nat = 0;

    public query func get(): async Nat {
        count
    };

    public func inc(): async Nat {
        count += 1;
        count
    };

    public func add(n: Nat): async Nat {
        count += n;
        count
    };
}