import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Time "mo:core/Time";
import EmailClient "mo:caffeineai-email/emailClient";
import Common "../types/common";
import Types "../types/enquiries";

module {
  /// Recipient of the internal team notification for every new enquiry.
  let teamRecipient = "hello@lutixdeeptech.com";

  /// Persist a new enquiry and return its assigned id.
  public func submit(
    enquiries : Map.Map<Nat, Types.Enquiry>,
    state : { var nextEnquiryId : Nat },
    input : Types.EnquiryInput,
  ) : Common.EnquiryId {
    let id = state.nextEnquiryId;
    state.nextEnquiryId := id + 1;
    let enquiry : Types.Enquiry = {
      id;
      name = input.name;
      email = input.email;
      company = input.company;
      message = input.message;
      submittedAt = Time.now();
    };
    enquiries.add(id, enquiry);
    id;
  };

  /// Return every stored enquiry, newest first.
  public func list(enquiries : Map.Map<Nat, Types.Enquiry>) : [Types.Enquiry] {
    enquiries.values().toArray().sort(
      func(a, b) = Nat.compare(b.id, a.id)
    );
  };

  /// Notify the team about a new enquiry by email. Never traps: a failed send
  /// must not roll back the stored enquiry.
  public func notifyTeam(enquiry : Types.Enquiry) : async () {
    let companyLine = switch (enquiry.company) {
      case (?company) { "<p><strong>Company:</strong> " # company # "</p>" };
      case null { "" };
    };
    let htmlBody =
      "<h2>New enquiry from the Lutix DeepTech website</h2>" #
      "<p><strong>Name:</strong> " # enquiry.name # "</p>" #
      "<p><strong>Email:</strong> " # enquiry.email # "</p>" #
      companyLine #
      "<p><strong>Message:</strong></p><p>" # enquiry.message # "</p>";
    ignore await EmailClient.sendServiceEmail(
      "no-reply",
      [teamRecipient],
      "New website enquiry from " # enquiry.name,
      htmlBody,
    );
  };
};
