import OQL "mo:caffeineai-oql";

module {
  /// Option → sentinel conversion for OQL auto-derivation. A null company is
  /// stored as the empty string so the column stays queryable.
  public func _toRow(self : ?Text) : OQL.Value =
    switch self {
      case null { #text("") };
      case (?text) { #text(text) };
    };
};
