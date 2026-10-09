import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import Types "../types/enquiries";
import EnquiriesLib "../lib/enquiries";

mixin (
  accessControlState : AccessControl.AccessControlState,
  enquiries : Map.Map<Nat, Types.Enquiry>,
  state : { var nextEnquiryId : Nat },
) {
  /// Public endpoint: submit a contact enquiry. Stores the enquiry and emails
  /// the team. Anonymous callers are allowed.
  public shared ({ caller }) func submitEnquiry(input : Types.EnquiryInput) : async Types.SubmitResult {
    ignore caller;
    if (input.name.size() == 0 or input.email.size() == 0 or input.message.size() == 0) {
      return #err("Name, email and message are required.");
    };
    let id = EnquiriesLib.submit(enquiries, state, input);
    let stored = enquiries.get(id) ?? Runtime.trap("Enquiry not found after submit");
    await EnquiriesLib.notifyTeam(stored);
    #ok(id);
  };

  /// Admin-only: list every stored enquiry, newest first.
  public query ({ caller }) func listEnquiries() : async [Types.Enquiry] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can list enquiries");
    };
    EnquiriesLib.list(enquiries);
  };
};
