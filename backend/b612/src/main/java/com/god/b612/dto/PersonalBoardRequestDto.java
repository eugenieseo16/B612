package com.god.b612.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
public class PersonalBoardRequestDto {

    @Getter
    @Setter
    public static class Create {
        String ownerAddress;
        String writerAddress;
        String personalBoardContent;
    }

    @Getter
    @Setter
    public static class Update {
        int personalBoardId;
        String writerAddress;
        String personalBoardContent;
    }

}
