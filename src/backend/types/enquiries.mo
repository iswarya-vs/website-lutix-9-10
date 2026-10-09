import Common "common";

module {
  /// A contact/enquiry submitted from the public website form.
  public type Enquiry = {
    id : Common.EnquiryId;
    name : Text;
    email : Text;
    company : ?Text;
    message : Text;
    submittedAt : Common.Timestamp;
  };

  /// Caller-supplied payload for a new enquiry. The backend assigns the id and
  /// timestamp.
  public type EnquiryInput = {
    name : Text;
    email : Text;
    company : ?Text;
    message : Text;
  };

  /// Outcome of a submission attempt.
  public type SubmitResult = {
    #ok : Common.EnquiryId;
    #err : Text;
  };
};
