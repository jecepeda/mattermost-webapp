// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';

import {FormattedMessage} from 'react-intl';

import {
    TELEMETRY_CATEGORIES,
    HostedCustomerLinks,
    CloudLinks,
} from 'utils/constants';

import {trackEvent} from 'actions/telemetry_actions';

export function seeHowBillingWorks(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, cloud: boolean) {
    e.preventDefault();
    if (cloud) {
        trackEvent(TELEMETRY_CATEGORIES.CLOUD_PURCHASING, 'click_see_how_billing_works');
        window.open(CloudLinks.BILLING_DOCS, '_blank');
    } else {
        trackEvent(TELEMETRY_CATEGORIES.SELF_HOSTED_PURCHASING, 'click_see_how_billing_works');
        window.open(HostedCustomerLinks.BILLING_DOCS, '_blank');
    }
}

type Props = {
    isCloud: boolean;
}

export default function Consequences(props: Props) {
    let text = (
        <FormattedMessage
            defaultMessage={'You will be billed today. Your license will be applied automatically. <a>See how billing works.</a>'}
            id={'self_hosted_signup.signup_consequences'}
            values={{
                a: (chunks: React.ReactNode) => (
                    <a
                        onClick={(e) => seeHowBillingWorks(e, props.isCloud)}
                    >
                        {chunks}
                    </a>
                ),
            }}
        />);

    if (props.isCloud) {
        text = (
            <FormattedMessage
                defaultMessage={'Your credit card will be charged today. <a>See how billing works.</a>'}
                id={'cloud_signup.signup_consequences'}
                values={{
                    a: (chunks: React.ReactNode) => (
                        <a
                            onClick={(e) => seeHowBillingWorks(e, props.isCloud)}
                        >
                            {chunks}
                        </a>
                    ),
                }}
            />);
    }
    return (
        <div className='signup-consequences'>
            {text}
        </div>
    );
}
