package com.god.b612.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
public class BaobabArticleRequestDto {

    @Getter
    @Setter
    public static class Create {
        String memberAddress;
        String baobabArticleContent;
    }

    @Getter
    @Setter
    public static class Update {
        int baobabArticleId;
        String memberAddress;
        String baobabArticleContent;
    }

}
