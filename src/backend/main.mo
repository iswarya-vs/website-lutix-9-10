import Map "mo:core/Map";
import Nat "mo:core/Nat";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import Expose "mo:caffeineai-oql/Expose";
import MapEntity "mo:caffeineai-oql/MapEntity";
import Entity "mo:caffeineai-oql/Entity";
import RecordValue "mo:caffeineai-oql/RecordValue";
import NatValue "mo:caffeineai-oql/NatValue";
import TextValue "mo:caffeineai-oql/TextValue";
import IntValue "mo:caffeineai-oql/IntValue";
import OptTextValue "types/OptTextValue";
import Types "types/enquiries";
import EnquiriesApi "mixins/enquiries-api";
import ApiDocMixin "mixins/api-doc";

actor {
  let accessControlState : AccessControl.AccessControlState;
  include MixinAuthorization(accessControlState, null);

  let enquiries : Map.Map<Nat, Types.Enquiry>;
  let state : { var nextEnquiryId : Nat };

  include EnquiriesApi(accessControlState, enquiries, state);

  include Expose({
    entities = [
      enquiries.toEntity("enquiry", "Enquiry", "id")
        .sample({
          id = 0;
          name = "";
          email = "";
          company = null;
          message = "";
          submittedAt = 0;
        })
        .controllerOnly()
        .build(),
    ];
  });

  include ApiDocMixin();
};
